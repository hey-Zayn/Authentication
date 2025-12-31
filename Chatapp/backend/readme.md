# 🗨️ Chatapp Backend - Detailed Documentation

Welcome to the backend of the Chatapp! This documentation is designed to help new developers understand how the server-side logic is structured, how real-time communication is implemented, and the overall architectural patterns used.

---

## 🏗️ Architecture: Model-View-Controller (MVC)

The backend is built using the **MVC (Model-View-Controller)** pattern. This architectural style helps in separating concerns, making the codebase easier to maintain and scale.

- **Models (`/models`)**: Define the data structure and schema for our application. We use **Mongoose** to interact with MongoDB.
  - `user.model.js`: Defines data for users (name, email, password, profile pics).
  - `message.model.js`: Defines the structure of a chat message (sender, receiver, text, image).
- **Views**: In this backend, the "View" is the JSON data returned by our API endpoints, which the frontend (React) then renders.
- **Controllers (`/controllers`)**: Contain the business logic. They process incoming requests, interact with Models, and send back responses.
  - `auth.controller.js`: Handles logic for signup, login, logout, and profile updates.
  - `message.controller.js`: Handles fetching users for the sidebar and sending/receiving messages.

---

## 📁 File Structure & Responsibilities

```text
backend/
├── app.js               # Main entry point: initializes middleware and routes
├── controllers/          # Business logic (MVC Controllers)
├── database/             # MongoDB connection setup
├── lib/                  # Library & utility integrations (Socket.io, Cloudinary)
│   ├── socket.js        # Core Socket.io logic (the heart of real-time)
│   └── cloudinary.js    # Media upload configuration
├── middleware/           # Functionality that runs before controllers (e.g., Auth Guards)
├── models/               # Data schemas (MVC Models)
├── routes/               # API path definitions (MVC Routes)
├── utils/                # Helper functions (e.g., JWT generation)
└── .env                  # Secrets and configuration (NOT committed to Git)
```

---

## 🔌 Real-time Communication with Socket.io

Socket.io is used for real-time, bi-directional communication. Unlike standard HTTP requests (where the client must always ask the server for data), Sockets allow the server to **push** updates to clients instantly.

### How it's Implemented (`lib/socket.js`)

1.  **Server Initialization**: Instead of starting a standard Express server, we create an **HTTP Server** and attach both Express and Socket.io to it.
2.  **Connection Handling**: When a client connects, the server performs a "handshake" to identify them using their `userId` (sent in the `auth` object).
3.  **Online Users Tracking**: We maintain a `userSocketMap` ({userId: socketId}) to keep track of who is currently online.
4.  **Broadcasting Status**: Whenever a user connects or disconnects, the server emits a `getOnlineUsers` event to **all** connected clients using `io.emit()`.

### How it Works in Messaging

When a message is sent (`message.controller.js` -> `SendMessage`):

1.  The message is saved to the database.
2.  The server looks up the specific `socketId` for the receiver using `getReceiverSocketId`.
3.  If the receiver is online, the server sends the message directly to their socket using `io.to(receiverSocketId).emit("newMessage", ...)`.

---

## 🛠️ Key Dependencies & Technologies

- **Express**: Minimal and flexible Node.js web application framework.
- **Socket.io**: Enables real-time, bi-directional communication.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Cloudinary**: For hosting and managing images (profile pictures and chat attachments).
- **JSON Web Token (JWT)**: Used for secure, stateless authentication.
- **Bcryptjs**: Used to hash passwords before saving them to the database.
- **Cookie-parser**: Middleware to parse cookies from incoming requests.
- **Cors**: Allows our frontend (running on a different port) to talk to the backend.

---

## 🔐 Authentication Flow

1.  **Signup/Login**: User details are verified, and a JWT is generated.
2.  **HTTP-Only Cookies**: The JWT is sent to the client in an `httpOnly` cookie. This is a security best practice that prevents the token from being stolen by malicious scripts.
3.  **Auth Middleware (`auth.middleware.js`)**: For any "protected" route, this middleware checks the cookie, verifies the JWT, and adds the user object to `req.user`.

---

## 🚀 Development Mode

We use **Nodemon** for development. It automatically restarts the server whenever you save a change in the code, saving you time.

```bash
npm run dev
```

---

Built with focus on **Real-time Performance** and **Security**.
