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

api.get('/registro',(req,res)=>{
    res.sendFile(__dirname+'/view/register.html');
})

api.get('/',Authn,(req,res)=>{
    res.sendFile(__dirname+'/view/index.html');
})


api.get('/monitor',(req,res)=> res.sendFile(__dirname+'/view/monitor.html'))
databases()

const server = api.listen(PORT,()=> console.log('Server UP'))

const io = socket(server,{
    origin: "*",
    credentials: true,
})

global.onlineUsers = new Map()

io.on('connection',socket =>{

    console.log("sockect conectado");

    setInterval(()=>{
        const usuarios = []
        for (const iterator of onlineUsers) {
            socket.broadcast.emit('listConnect',iterator[0])
        }
        
    },(5*1000))
   
    socket.on('add-user', user =>{
        onlineUsers.set(user,socket.id)
        socket.broadcast.emit('userConnect',user)        
    })

    socket.on('new_user_r',val =>{
        socket.broadcast.emit('new_user_i',val)
    })

    socket.on('addMenssage',data =>{
        const {to, msg} = data
        const sendSockect = onlineUsers.get(to)
        if(sendSockect){
                socket.to(sendSockect).emit("getMenssage",data)
        }
    })

    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} desconectado`)
        for (const iterator of onlineUsers) {
            if(iterator[1] === socket.id){
                socket.broadcast.emit('userDesconnect',iterator[0])
                onlineUsers.delete(iterator[0])
                
            }
        }
    });
})
