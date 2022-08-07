const  mongoose  = require("mongoose");

const messageSchema = mongoose.Schema({
    message:{
        type:String,
    },
    emisor: {
        type:  String,
      
    },
    receptor: {
        type:  String,
    },

},{timestamps:true})

module.exports = mongoose.model('monitor',messageSchema)