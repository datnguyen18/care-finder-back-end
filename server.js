const http = require('http');
const app = require('./app')
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io  = module.exports.io = require('socket.io')(server);
const MessageController = require('./api/controllers/message');
server.listen(port, () => {
    console.log(`🚀 Started on port ${port}`);
   
});

const sockets = {}

io.on('connect',  socket => {
  socket.on('init', (userId) => {
    sockets[userId.senderId] = socket;
  });

  // socket.on('message', (message) => {
  //   if (sockets[message.receiverId]) {
  //     sockets[message.receiverId].emit('message', message);
  //   }
  //   MessageController.create_message(message);
  // });
  // socket.on('disconnect', (userId) => {
  //   delete sockets[userId.senderId];
  // });

});

