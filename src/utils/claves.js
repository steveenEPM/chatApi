const Palabras = (frase)=>{
    const claves =[
        "terrorismo",
        "terrorisno",
        "t3rrorismo",
        "matar",
        "m4t4r",
        "extorcionar",
        "3xtorcionar",
        "3xt0rc10n4r",
        "extr0cionar"
    ]

    const string = frase.toLowerCase()
    const array = string.split(' ')
    let existe = false
    
    array.forEach(element => {
        const bool = claves.find( index => index === element )
        if(bool !== undefined) existe = true
       
    });
    return existe
}

module.exports = Palabras