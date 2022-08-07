const  mongoose  = require("mongoose");

const messageSchema = mongoose.Schema({
    message:{
        text:{type:String,required: true},
    },
    usuarios:Array,
    sender: {
        type:  String,
        ref: "usuarios",
        required: true,
      },

},{timestamps:true})

module.exports = mongoose.model('mensajes',messageSchema)