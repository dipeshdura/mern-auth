# MERN Auth

A full-stack authentication system built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js). This project provides user registration, login, profile management, and secure authentication using JWT and password hashing.

---

## Features

- User registration with email and password
- User login with JWT-based authentication
- Protected routes on both frontend and backend
- Password hashing with bcrypt for security
- Profile update with image upload support
- Google OAuth sign-in integration (optional)
- Persistent login with Redux Persist
- Responsive and clean UI with React

---

## Technologies Used

- **Frontend:** React, Redux Toolkit, React Router, React Toastify
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcrypt
- **Authentication:** JSON Web Tokens (JWT), Google OAuth (optional)
- **File Upload:** Multer (depending on implementation)
- **State Management:** Redux Toolkit with Redux Persist

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or cloud e.g., MongoDB Atlas)
- npm or yarn package manager

### Installation


1. Clone the repository

```bash
git clone https://github.com/yourusername/mern-auth.git
cd mern-auth

# Installing Redux and Redux Toolkit for temporary state management
npm i @reduxjs/toolkit react-redux

# Installing Redux Persist for persistent state storage
npm i redux-persist

# Note:
# Redux Toolkit alone handles temporary (in-memory) state management.
# Redux Persist is optional and can be added if you want to persist the Redux store across page reloads.
# If you don't use redux-persist, your app will still work correctly but state will reset on refresh.


#backend .env
PORT=your-port
MONGODB_URL=your-mongo-database-url
JWT_SECRET=your-secret-key

#frontend .env

VITE_FIREBASE_API_KEY=your-firebase-api-key

#render 
# to wake up everytime
npm i cron
