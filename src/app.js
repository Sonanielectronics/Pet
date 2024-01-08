const express = require("express");
const app = express();

require("./db/conn");
const router = require('./router/router');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "..")));

// app.use(express.static(path.join(__dirname, 'public')));

// var ejs = require("ejs");
// var ejs_folder_path = path.join(__dirname, "../templates");
// app.set("view engine", "ejs");
// app.set("views", ejs_folder_path);

require('dotenv').config();

const port = process.env.PORT || 3500;

io.on('connection', (socket) => {

    console.log('A user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

});

app.use('/', router);

server.listen(port, () => {
    console.log(`Server running at ` + port);
});