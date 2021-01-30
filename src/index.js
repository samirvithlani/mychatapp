const path = require('path')
const express = require('express')
const htpp = require('http')
const app = express()
const server = htpp.createServer(app)
const socketio = require('socket.io')
const { Socket } = require('dgram')
 const {generateMessage} = require('./utils/message')
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

const io = socketio(server)
let count = 0

io.on('connection', (socket) => {
    console.log('new wen socket connection')

    socket.emit('message', generateMessage('Welcome!!'))
    socket.broadcast.emit('message',generateMessage('new user joined'))
    socket.on('sendMessage', (message,callback) => {
        io.emit('message', generateMessage(message))
        callback()
    })
    socket.on('sendLocation',(cords)=>{
        //io.emit('message',`Location:${cords.latitude},${cords.longitude}`)
        io.emit('message',`https://google.com/maps?q=${cords.latitude},${cords.longitude}`)
    })

    socket.on('disconnect',()=>{
        io.emit('message',generateMessage("A user left"))
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