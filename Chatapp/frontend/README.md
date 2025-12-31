# 💻 Chatapp Frontend - Detailed Documentation

Welcome to the frontend of the Chatapp! This is a modern, responsive React application designed for real-time communication. It leverages state management for seamless user experiences and Socket.io for instant messaging.

---

## 🚀 Tech Stack

- **React 19**: The core library for building our user interface.
- **Vite**: A lightning-fast build tool and development server.
- **Zustand**: A small, fast, and scalable barebones state-management solution.
- **Socket.io-client**: Enables real-time, bi-directional communication with the backend.
- **Tailwind CSS & DaisyUI**: For high-performance, utility-first styling and beautiful pre-built components/themes.
- **React Router 7**: Handles navigation and protected routing.
- **Axios**: For making HTTP requests to our backend API.

---

## 📁 File Structure & Organization

```text
frontend/
├── public/              # Static assets (logo, default avatar)
├── src/
│   ├── components/      # Reusable UI components (Navbar, Sidebar, ChatContainer)
│   │   └── skeletons/   # Loading states for a better UX
│   ├── lib/             # Utility functions and axios configuration
│   ├── pages/           # High-level route components (Home, Profile, Settings)
│   ├── store/           # Zustand state stores (The "Brain" of the app)
│   ├── App.jsx          # Root component & Route definitions
│   └── main.jsx         # Application entry point
```

---

## 🧠 State Management (Zustand)

We use **Zustand** to manage global state without the complexity of Redux.

### 1. `useAuthStore.js` (Authentication & Sockets)

- **Auth State**: Tracks the `authUser` and handles Login, Signup, and Logout.
- **Socket Management**: This store is responsible for creating and maintaining the **Socket Connection**.
  - When a user logs in, `connectSocket()` is called.
  - It identifies the user to the server using the `userId` in the `auth` handshake.
  - It keeps track of the `onlineUsers` list provided by the server.

### 2. `useChatStore.jsx` (Messaging Logic)

- **Chat State**: Manages the list of `users` (for the sidebar), the currently `selectedUser`, and the chat `messages`.
- **Real-time Subscription**: Provides `subscribeToMessages()` and `unsubscribeFromMessages()`.
  - It listens for the `newMessage` socket event.
  - If an incoming message is from the currently selected user, it instantly appends it to the chat UI.

---

## 🔌 Real-time Flow (Frontend)

1.  **Connection**: As soon as a user's session is verified (`checkAuth`), the socket connection is initiated in `useAuthStore`.
2.  **Listening for Users**: The app listens for the `getOnlineUsers` event to highlight active users in the Sidebar.
3.  **Active Chat**: When you select a user to chat with, `ChatContainer` calls `subscribeToMessages()`.
4.  **Instant Receiving**: If a new message arrives via socket, the UI updates instantly without any page refresh.
5.  **Cleanup**: When you switch users or leave the chat, it unsubscribes from the socket events to prevent memory leaks and duplicate messages.

---

## 🎨 Styling & Themes

The app uses **DaisyUI** themes. Users can change the entire look of the application (colors, border-radius, etc.) via the **Settings** page. This is implemented by applying the chosen theme to the root HTML element.

---

## 🔐 Security & Interceptors

- **HTTP-Only Cookies**: Authentication is handled via secure, server-side cookies.
- **Axios Instance**: We use a central axios instance (`lib/axios.js`) configured with `withCredentials: true`. This ensures that the authentication cookie is automatically sent with every request.

---

## 🛠️ Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Environment Setup**:

    - Build/Config uses `VITE_` prefix for client-side environment variables.
    - Ensure your backend port matches the configuration in `lib/axios.js`.

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

---

Built with ❤️ for a modern and fluid chat experience.
