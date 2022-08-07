const mongosee = require('mongoose')

const Usuario = new mongosee.Schema({
    username:{
        type:String,
        required: true,
        min:4,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6,
    }
},{timestamps:true})

module.exports = mongosee.model("Usuario",Usuario)