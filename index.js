const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const socket = require('socket.io')

const databases = require('./src/connections/mongodb')

const routes = require('./src/routes/authen')
const chatRoutes = require('./src/routes/chats')
const monitorRoutes = require('./src/routes/monitor')
const {Authn} = require('./src/controllers/authen')


const api = express()
const PORT = 3030 || 8080

api.use(express.static('public'))

api.use(express.json())

api.use(express.urlencoded({extended:true}))

api.use(cookieParser())

api.use(cors({
    origin:"*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}))

api.use('/chatApi/auth',routes)
api.use('/chatApi/chat',chatRoutes)
api.use('/chatApi/monitor',monitorRoutes)


api.get('/loing',(req,res)=>{
    res.sendFile(__dirname+'/view/loing.html');
})

api.get('/',Authn,(req,res)=>{
    res.sendFile(__dirname+'/view/index.html');
})

databases()

const server = api.listen(PORT,()=> console.log('Server UP'))

const io = socket(server,{
    origin: "*",
    credentials: true,
})

global.onlineUsers = new Map()

io.on('connection',socket =>{

    console.log("sockect conectado");

    socket.on('add-user', user =>{
        onlineUsers.set(user,socket.id)

        socket.broadcast.emit('userConnect',user)

        
      
    })

    socket.on('addMenssage',data =>{
        const {to, msg} = data
        console.log(data);
        const sendSockect = onlineUsers.get(to)
        console.log(to)
        console.log(sendSockect);
        if(sendSockect){
                socket.to(sendSockect).emit("getMenssage",data)
        }
    })

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} desconectado`)
        for (const iterator of onlineUsers) {
            if(iterator[1] === socket.id){
                socket.broadcast.emit('userDesconnect',iterator[0])
            }
        }

    });
})
