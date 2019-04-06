const http = require('http');
const app = require('./app')
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io  = module.exports.io = require('socket.io')(server);
const mongoose = require('mongoose');

const Conversation = require('./api/models/conversation');

server.listen(port, () => {
    console.log(`🚀 Started on port ${port}`);
   
});

io.on('connect',  socket => {
  console.log('A person just conected', socket.id)
  let clientInfo = Object;
  socket.on('changeSocketID', data => {
    clientInfo[String(data.customId)] = socket
    console.log(Object.keys(clientInfo).length)
  })

  socket.on('subcribe' , data => {
    console.log('joining room', data.room)
    const conversation = new Conversation({
      _id: new mongoose.Types.ObjectId(),
      userId: data.userId,
      doctorId: data.doctorId
    })
    console.log(conversation._id)
    conversation.save()
      .then(res => {
        socket.join(conversation._id)
        clientInfo[String(data.doctorId)].join(conversation._id)
      })
  })

  socket.on('send message', data => {
    console.log('sending room post', data.room)
    socket.broadcast.to(data.room).emit('conversation private post', {
      message: data.message
    })
  })
  
});

