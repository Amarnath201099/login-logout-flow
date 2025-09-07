# Klickks - Authentication System (React.js + Node.js)

A **full-stack authentication system** with login, registration, session handling, and protected routes.

---

## 🔗 Live Demo

- **Frontend (Vercel):** [https://klickks-frontend.vercel.app](https://login-logout-flow-rouge.vercel.app/login)
- **Backend (Render):** [https://klickks-backend.onrender.com](https://login-logout-flow-sxl4.onrender.com)

---

## ⚙️ Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | React.js, Axios, Bootstrap          |
| Backend    | Node.js, Express.js                 |
| Database   | SQLite                              |
| Auth       | bcrypt, express-session             |
| Styling    | Mobile-first, Responsive Design     |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📂 Project Structure

```
project-root/
│
├── backend/
│ ├── server.js # Express backend
│ ├── db.js # SQLite DB setup
│ ├── routes/
│ │ └── auth.js # Login/Register API routes
│ ├── .env # Backend environment variables
│ └── users.db
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── App.js
│ │ ├── components/
│ │ │ ├── Login.js
│ │ │ ├── Register.js
│ │ │ └── Dashboard.js
│ ├── public/
│ ├── .env # Frontend environment variables
│ └── package.json
│
└── README.md
```

---

---

## 🚀 How to Run Locally

### 🔹 Backend Setup

1. **Navigate to the backend directory and install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Create the .env file:**

   ```bash
   touch .env
   ```

3. **Add the following environment variables to the .env file:**

   ```env
   PORT=5000
   SESSION_SECRET=your-secret-key
   ```

4. **Start the backend server:**

   ```bashs
   node server.js
   ```

   Runs on: http://localhost:5000

---

### 🔹 Frontend Setup

1. **Navigate to the frontend directory and install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **(Optional) Create a .env file to override the default API base URL**

   ```
   touch .env
   ```

3. **Add the following line (only if you want to change the default):**

   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000
   ```

   ℹ️ If no .env is provided, the app will default to http://localhost:5000 automatically.

4. **Start the frontend application:**

   ```bash
   npm start
   ```

   Runs on: http://localhost:3000

---

## 🔐 Authentication Flow

- **Register:** `POST /register`
- **Login:** `POST /login`
- **Session Check:** Frontend verifies authentication status via `GET /auth/dashboard`
- **Protected Route:** `/dashboard` accessible **only** when logged in
- **Logout:** Clears session on the backend and redirects to login page

---

## 📱 Responsive Design

This project utilizes:

- 🚀 **Bootstrap 5** for layout, spacing, and components
- 📱 **Mobile-first CSS** using Flexbox
- 📏 **Media queries** for layout breakpoints

Tested on:

- 📱 Mobile (iOS / Android)
- 📲 Tablets
- 💻 Desktops

---

## 🧠 Future Improvements

- 📧 Password reset via email
- 🔐 JWT-based token authentication (for stateless APIs)
- 🤝 Google OAuth login
- 🖼️ Profile picture upload (Multer + Cloudinary)
- 🛡️ Role-based access (admin/user)
- 🚫 Rate limiting and brute-force protection

---

## 🙌 Thank You!

Thanks for checking out this project! If you find any issues or have suggestions, feel free to open an issue or submit a pull request. Your contributions and feedback are always welcome! 🚀

---

## 📫 Contact

For any questions or inquiries, reach out via:

- Email: amarnath201099@gmail.com

---

**Happy coding! 🎉**
