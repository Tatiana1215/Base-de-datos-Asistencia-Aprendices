
const Usuario = require("../models/Usuarios")

const usuarioHelper = {
    existsEmail: async (Email)=>{
    const exists = await Usuario.findOne({Email:Email})
    if(exists){
        throw new Error("El Email ya existe")
    }
    },
    existePassword: async (Password)=>{
        const existe = await Usuario.findOne({Password:Password})
        if(existe){
            throw new Error("La contraseña ya existe ingrese otra")
        }
    }
}

module.exports = {usuarioHelper}