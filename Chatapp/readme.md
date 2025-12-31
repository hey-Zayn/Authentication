# 🗨️ Chatapp - Full-Stack Real-Time Communication Platform

Welcome to the Chatapp! This is a complete, full-stack real-time messaging application built with a focus on speed, security, and a seamless user experience.

The project is divided into two main parts:

- **Backend**: A Node.js & Express server handling logic, database, and sockets.
- **Frontend**: A React application for a responsive and intuitive user interface.

---

## ✨ Features

- **Real-Time Messaging**: Instant message delivery using Socket.io.
- **Online Status**: Live tracking and broadcasting of online/offline users.
- **Authentication**: Secure user sessions with JWT and HTTP-Only cookies.
- **Media Handling**: Support for profile pictures and chat image attachments via Cloudinary.
- **Dynamic Themes**: Customizable UI themes using DaisyUI and Tailwind CSS.
- **Responsive Design**: Optimized for both desktop and mobile screens.

---

## 🏗️ Project Architecture

We follow a modular architecture to keep the frontend and backend concerns separated while enabling efficient communication.

```text
Chatapp/
├── backend/    # Node.js, Express, MongoDB, Socket.io (Server-side)
├── frontend/   # React, Zustand, Tailwind, Socket.io-client (Client-side)
└── readme.md   # Project overview (This file)
```

For more details on each component, please refer to their specific documentation:

- [📄 Backend Documentation](./backend/readme.md)
- [📄 Frontend Documentation](./frontend/README.md)

---

## 🔌 How it Works (The Big Picture)

1.  **Handshake**: When you open the app and log in, the **Frontend** establishes a persistent socket connection with the **Backend**.
2.  **Discovery**: The server acknowledges your connection and tells everyone else you are online. It also sends you a list of who else is currently active.
3.  **Communication**: When you send a message, it's first saved to MongoDB (so it's never lost). Simultaneously, the server identifies if the receiver is online and "pushes" the message to their screen instantly.

---

## 🚀 Getting Started

### 1. Backend Setup

Go to the `backend` directory, install dependencies, and set up your `.env` file.

```bash
cd backend
npm install
# Configure your .env with MONGODB_URI, JWT_SECRET, and CLOUDINARY credentials
npm run dev
```

### 2. Frontend Setup

Open a new terminal, go to the `frontend` directory, and start the development server.

```bash
cd frontend
npm install
npm run dev
```

---

## 🛠️ Main Technologies

- **Frontend**: React, Zustand, Tailwind CSS, DaisyUI.
- **Backend**: Node.js, Express, MongoDB/Mongoose.
- **Real-time**: Socket.io.
- **Cloud**: Cloudinary (Image Storage).

---

Built with ❤️ for a modern chat experience.
