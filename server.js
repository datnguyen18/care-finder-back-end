const http = require('http');
const app = require('./app')
const port = process.env.PORT || 3000;
const socketio = require('socket.io');
const server = http.createServer(app);
const websocket = socketio(server);

server.listen(port, () => {
    console.log(`🚀 Started on port ${port}`);
    websocket.on('connect', (socket) => {
      console.log('A person just conected', socket.id)
    })
});