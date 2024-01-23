const socketIo = require('socket.io');
const { Todo6 } = require("./model/schema");

function setupSocket(server) {
    const io = socketIo(server, {
        cors: {
            origin: '*',
        },
        path: '/socket.io'
    });

    io.on('connection', (socket) => {
        console.log('New user connected');

        socket.on('sendMessage', async (messageContent) => {

            let data = new Todo6({
                Message: messageContent.text
            })

            try {
                await data.save();
                io.emit('message', messageContent); // Broadcast the message to all connected clients
            } catch (error) {
                console.error('Error saving message to MongoDB:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io;
}

module.exports = setupSocket;