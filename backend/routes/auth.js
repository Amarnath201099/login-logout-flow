const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const db = require("../db");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    db.get(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, existingUser) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Database error during registration." });
        }

        if (existingUser) {
          return res
            .status(400)
            .json({ message: "Registration failed: Email already in use." });
        }

        const hash = await bcrypt.hash(password, 10);

        db.run(
          "INSERT INTO users (email, password) VALUES (?, ?)",
          [email, hash],
          function (err) {
            if (err) {
              return res
                .status(500)
                .json({ message: "Failed to register user." });
            }
            return res.json({ message: "User registered successfully." });
          }
        );
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unexpected error during registration." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Login failed due to server error." });
    }

    if (!user) {
      return res
        .status(400)
        .json({ message: "Login failed: Email not found." });
    }

    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res
          .status(400)
          .json({ message: "Login failed: Incorrect password." });
      }

      req.session.userId = user.id;
      return res.json({ message: "Login successful. Session created." });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Login failed due to server error." });
    }
  });
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Logout failed due to server error." });
    }

    res.clearCookie("connect.sid");
    return res.json({ message: "Logout successful. Session ended." });
  });
});

// Protected Dashboard Route
router.get("/dashboard", (req, res) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized access. Please log in." });
  }

  return res.json({
    message: `Access granted. Welcome user with ID ${req.session.userId}.`,
  });
});

module.exports = router;
