const modelMonitor = require('../model/modelMonitor')
const Palabras = require('../utils/claves')


module.exports.addMonitor = async (req, res) => {
    try {
        const {emisor,receptor,mensaje} = req.body
        if (Palabras(mensaje)) {
            const results = await modelMonitor.create({
                message: mensaje,
                emisor: emisor,
                receptor: receptor
            })
            if(!results) throw 'error en el servidor'
            return res.status(200).json()
        }
        console.log("d");
        return res.status(200).json()
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

module.exports.getMonitor = async (req, res) => {
    try {
        const results = await modelMonitor.find().sort({ updatedAt: 1 })
    
        res.status(200).json(results)
    } catch (error) {
        console.log(error);
        res.status(500).json('Error en la peticion por favor intente nuevamente')
    }
}