# Real-Time WebSocket Broadcasting Server

A simple yet powerful Node.js server that uses WebSockets to enable real-time, bi-directional communication between clients. When one client sends a message, the server broadcasts it to all other connected clients, effectively creating a basic chat or notification system.

## 🚀 Features

- **Real-time Communication**: Low-latency message exchange using the WebSocket protocol.
- **Broadcasting Logic**: Automatic message distribution to all active connections.
- **HTTP/WS Hybrid**: Runs a combined HTTP and WebSocket server on a single port.
- **Scalable Foundation**: Built with the lightweight `ws` library for high performance.

## 🛠️ Tech Stack & Libraries

The following libraries were installed to build this project:

- **ws**: A fast and thoroughly tested WebSocket client and server implementation for Node.js.
- **Express**: (Installed but currently optional) High-performance web framework for Node.js.
- **Nodemon**: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- **Node.js `http` module**: Native module used to create the base server to which WebSockets are attached.

## 📥 Installation

Follow these steps to set up the project locally:

1. **Clone the project** (or copy the files into a new directory).
2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🚦 How to Run

Start the development server with automatic reloading:

```bash
npm run dev
```

The server will start running on `http://localhost:3000`.

## 🧠 Code Breakdown (`index.js`)

Here is an explanation of every part of the code you've written:

### 1. Server Initialization

```javascript
const http = require("http");
const { WebSocketServer } = require("ws");

const server = http.createServer((req, res) => {
  res.end("Hello World");
});
```

- We import the `http` module to handle standard web requests.
- We create a base server that responds with "Hello World" to any regular browser request.

### 2. Attaching WebSockets

```javascript
const wss = new WebSocketServer({ server });
```

- We initialize a new `WebSocketServer` and bind it to our existing HTTP `server`. This allows both HTTP and WS traffic to share the same port (3000).

### 3. Handling Connections

```javascript
wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  // ...
});
```

- The code listens for new clients connecting. When a connection is established, a `ws` (socket) object is created for that specific user.

### 4. Broadcasting Messages

```javascript
ws.on("message", function message(data, isBinary) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data, { binary: isBinary });
    }
  });
});
```

- This is the core logic. When the server receives a `message` from one client, it loops through **all** connected clients (`wss.clients`).
- If a client is still connected (`OPEN`), the server forwards that exact message to them.

## 🧪 How to Test

You can test this directly in your browser without any extra tools:

1. Open your browser to `http://localhost:3000` (it will say "Hello World").
2. Open the **Developer Console** (F12 or Ctrl+Shift+I).
3. Paste the following code to connect as a client:
   ```javascript
   const socket = new WebSocket("ws://localhost:3000");
   socket.onmessage = (event) =>
     console.log("Message from server:", event.data);
   socket.onopen = () => socket.send("Hello from the browser!");
   ```
4. Open a **second tab** and do the same. You will see messages appearing in both consoles as they are broadcasted!
