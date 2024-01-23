const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors'); // Add this line

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Use the cors middleware
app.use(cors());

// Serve the React.js frontend
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected');

  // Listen for the 'joinRoom' event from the client
  socket.on('joinRoom', (data) => {
    console.log(`Client joined room: ${data.roomName}`);

    // Emit a static message to the client when the 'joinRoom' event is received
    socket.emit('staticMessage', 'Welcome to the room!');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
