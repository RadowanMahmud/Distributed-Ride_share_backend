const express = require('express')
const app = express()
const cors = require('cors')
const server = require('http').createServer()
const sch = require('node-schedule')

const io = require('socket.io')(server)

app.use(cors())
app.use(express.json())

let storeSocket;

io.of('communication').on('connection', (socket)=>{
    console.log("new user connected")
    storeSocket = socket
})

app.post('/api/communication', (req,res)=>{
    console.log("messaged received")
    storeSocket.emit("welcome", req.body.driver_name +' has been matched with '+ req.body.rider_name + ' and the fiar is ' + req.body.mindist*2 +' #'+ req.body.driver_id)
})

server.listen(8001,()=>{
    console.log('socket for communication module is opened at port 8001')
})
app.listen(8000, () => {
    console.log('server for communication module is opened at port 8000')
})

