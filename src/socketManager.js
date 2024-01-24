const socketIo = require('socket.io');
const { Todo, Todo2, Todo3, Todo4, Todo5, Todo6, Todo7, Todo8, Todo9, Todo10, Todo11 } = require("./model/schema");

function setupSocket(server) {

    const io = socketIo(server, {
        cors: {
            origin: '*',
        },
        path: '/socket.io'
    });

    // io.on('connection', (socket) => {
    //     console.log('New user connected');

    //     socket.on('joinRoom', (room) => {
    //         socket.join(room);
    //         console.log(`User joined room: ${room}`);
    //     });

    //     socket.on('sendMessage', async (messageContent) => {

    //         let data = new Todo6({
    //             Message: messageContent.text
    //         });

    //         try {

    //             await data.save();
    //             io.to(messageContent.room).emit('message', messageContent); // Emit the message to clients in the specified room

    //         } catch (error) {
    //             console.error('Error saving message to MongoDB:', error);
    //         }

    //     });

    //     socket.on('disconnect', () => {
    //         console.log('User disconnected');
    //     });
    // });   

    const usersInRooms = {};

    io.on('connection', async (socket) => {

        const currentDate = new Date();

        let data = new Todo6({
            Time: currentDate
        });

        await data.save();

        socket.on('joinRoom', async (data) => {

            var { username, room } = data;

            let data5 = new Todo7({
                Sender: username,
                Receiver: room
            });
    
            await data5.save();

            const senderReceiverQuery = {
                $or: [
                  { Sender: username, Receiver: room },
                  { Sender: room, Receiver: username }
                ]
              };

              const senderReceiverQuery2 = {
                $or: [
                  { User1: username, User2: room },
                  { User1: room, User2: username }
                ]
              };

            var finddData = await Todo11.findOne(senderReceiverQuery2)
    
            if(!finddData){

                let data1 = new Todo11({
                    User1: username,
                    User2: room
                });
        
                await data1.save();

            }

            var finddData2 = await Todo11.findOne(senderReceiverQuery2)
            var room = finddData2._id.toString()

            var SendData = await Todo8.find(senderReceiverQuery)

            await abc(SendData);

            socket.join(room);

            // Store user and room information
            usersInRooms[socket.id] = { username, room };

        });

        socket.on('sendMessage', async (messageContent) => {

            const user = usersInRooms[socket.id];

            if (user) {

                var senderReceiverQuery2 = await Todo11.findOne({ _id: user.room })

                const senderReceiverQuery = {
                    $or: [
                      { Sender: senderReceiverQuery2.User1, Receiver: senderReceiverQuery2.User2 },
                      { Sender: senderReceiverQuery2.User2, Receiver: senderReceiverQuery2.User1 }
                    ]
                  };

                var SendData = await Todo8.find(senderReceiverQuery)

            await abc(SendData);
            
            var Receiver2 = ''
            if(user.username == senderReceiverQuery2.User1){
                Receiver2 = senderReceiverQuery2.User2
            }else{
                Receiver2 = senderReceiverQuery2.User1
            }

                let data3 = new Todo8({
                    Message: messageContent.text,
                    Sender: user.username,
                    Receiver: Receiver2
                });

                try {

                    await data3.save();

                    io.to(user.room).emit('message', { ...messageContent, username: user.username }); // Emit the message to clients in the specified room

                } catch (error) {

                    console.error('Error saving message to MongoDB:', error);

                }

            }

        });

        // var messages = [
        //     {
        //         "_id": "65ae8c93564ac09348186b53",
        //         "Sender": "1",
        //         "Receiver": "2",
        //         "Message": "3",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "65ae8ca0564ac09348186b55",
        //         "Sender": "4",
        //         "Receiver": "5",
        //         "Message": "6",
        //         "__v": 0
        //     }
        // ];

        async function abc(name) {
            socket.emit('message2', name);
        }

        // socket.emit('message', messages);

        socket.on('emitData', async (messages2) => {

            var messages2 = [
                {
                    "_id": "65ae8c93564ac09348186b53",
                    "Sender": "7",
                    "Receiver": "8",
                    "Message": "9",
                    "__v": 0
                },
                {
                    "_id": "65ae8ca0564ac09348186b55",
                    "Sender": "10",
                    "Receiver": "11",
                    "Message": "12",
                    "__v": 0
                }
            ];

            // socket.emit('message', messages2 );
            io.emit('message', messages2);

        });

        socket.on('disconnect', async () => {

            const user = usersInRooms[socket.id];

            if (user) {

                let data4 = new Todo9({
                    LeavingUserName: user.username,
                    LeavingFrom: user.room
                });

                await data4.save();

                delete usersInRooms[socket.id];

            }

        });

    });

    return io;

}

module.exports = setupSocket;