const { addMonitor,getMonitor } = require("../controllers/monitor");

const monitorRoutes = require('express').Router()

monitorRoutes.post('/getMonitor',getMonitor)
monitorRoutes.post('/addMonitor',addMonitor)

module.exports = monitorRoutes