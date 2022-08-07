const { Registro,Loing } = require("../controllers/authen");

const routes = require('express').Router()

routes.post('/registro',Registro)
routes.post('/loing',Loing)
module.exports = routes