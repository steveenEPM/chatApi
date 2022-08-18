const modelUser = require("../model/modelUser");
const modelMessage = require('../model/modelMensajes')
const modelMonitor = require('../model/modelMonitor')

module.exports.getAllUser = async (req, res) => {
    try {
        const { emisor } = req.body
        console.log(req.cookies);
        const users = await modelUser.find({ username: {$ne:emisor} }).select([
            "_id",
            "username"
        ])
        return res.status(200).json(users)
    } catch (error) {
        return console.log(error)
    }
}

module.exports.addMensajes = async (req,res)=>{

    
    try {
        const {emisor,receptor,mensaje} = req.body
     
        const results = await modelMessage.create({
            message:{text:mensaje},
            usuarios:[emisor,receptor],
            sender:emisor
        })

        
        if(!results) throw 'Mensaje no enviado'
        return res.status(200).json(results)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports.getMensajes= async (req, res) => {
    try {
        const {emisor,receptor} = req.body
        const results = await modelMessage.find({
            usuarios:{
                $all:[emisor,receptor]
            }
        }).sort({updatedAt:1})

        
        const projectMensaje = results.map((key)=>{
            return {
                from: key.sender.toString() === emisor,
                message: key.message.text,
                fecha:key.updatedAt
            };
        });

        res.status(200).json(projectMensaje)
    } catch (error) {
        console.log(error);
        return res.status(500).json('Hubo un problemacon la peticion intente mas tarde')
    }
}


