const express = require('express')
const app = express()
const http = require('http').createServer(app)
const users={};
const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log(`Connected...${socket.id}`)
    socket.on('new-user-joined', (name) => {
       console.log(`New User Joined ${name}`);
       users[socket.id]=name;
       socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',(message)=>{
      socket.broadcast.emit('receive',{message:message,user:users[socket.id]});
    });

})