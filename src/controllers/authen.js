const modelUser = require("../model/modelUser");

module.exports.Registro = async (req, res) => {
    const { username, password } = req.body
    try {
        const usuario = await modelUser.findOne({ username })
        if (usuario)
            throw 'Nombre de usuario ya utilizado'
        const user = await modelUser.create({
            username,
            password
        })
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

module.exports.Loing = async (req, res) => {
    try {
        const { username, password } = req.body
        const usuario = await modelUser.findOne({ username })

        if (!usuario) 
            throw 'Usuario y/o contraseña incorrectos'
        if(password !== usuario.password) 
            throw 'Usuario y/o contraseña incorrectos'
        const cookiesOptions = {
            expires: new Date(Date.now()+50 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.cookie('cookie', usuario.username, cookiesOptions)
        return res.status(200).json(usuario)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }

}


module.exports.Authn=(req,res,next)=>{
    if(req.cookies){
        if(req.cookies.cookie){
            return next()
        }
        else{
            return res.redirect('/loing')
        }
    }
    return res.redirect('/loing')
}

