var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

var io = require('socket.io')(server);
var path = require('path');


app.use(express.static(path.join(__dirname, './')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


var name;

server.listen(3000,() => {
  console.log(server.address().address);
  console.log('Server listening on :__' + server.address().address + "__:3000");
});

io.on('connection', (socket) => {
  console.log('new user connected');

  

  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('chat message', `---${name} left the chat---`);

  });

  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);         
  });

  socket.on('joining msg', (username) => {
    name = username;
    io.emit('add user', `---${name} joined the chat---`);
  });

});

