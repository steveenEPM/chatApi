const { getAllUser,addMensajes,getMensajes} = require("../controllers/chats");

const chatRoutes = require('express').Router()

chatRoutes.post('/getAllUser',getAllUser)
chatRoutes.post('/addMensajes',addMensajes)
chatRoutes.post('/getMensajes',getMensajes)

module.exports = chatRoutes
