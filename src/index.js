const path = require('path')
const express = require('express')
const htpp = require('http')
const app = express()
const server = htpp.createServer(app)
const socketio = require('socket.io')
const { Socket } = require('dgram')
 const {generateMessage} = require('./utils/message')
const publicDirectoryPath = path.join(__dirname, '../public')
const{addUser,removeUser,getUserInRoom,getUser}= require('./utils/user')

app.use(express.static(publicDirectoryPath))

const io = socketio(server)
let count = 0

io.on('connection', (socket) => {
    console.log('new wen socket connection')

     
    socket.on('join', ({ options },callback) => {
        const {error,user} = addUser({id:socket.id,...options})

        if(error){

            return callback(error)
        }



        socket.join(user.room)
        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`))
        callback()

    })
    
    socket.on('sendMessage', (message,callback) => {
        io.emit('message', generateMessage(message))
        callback()
    })
    socket.on('sendLocation',(cords)=>{
        //io.emit('message',`Location:${cords.latitude},${cords.longitude}`)
        io.emit('message',`https://google.com/maps?q=${cords.latitude},${cords.longitude}`)
    })

    socket.on('disconnect',()=>{

        const user = removeUser(socket.id)
        if(user){

            //io.to(user.room).emit('message',generateMessage("A user left"))
            io.emit('message',generateMessage(`${user.username}has left`))
        }
        
    })

    /* socket.emit('countUpdated',count)

    socket.on('increment',()=>{
        count++;
        //socket.emit('countUpdated',count)
        io.emit('countUpdated',count)
    }) */
})

server.listen(3000, () => {
    console.log('server stared..')
})