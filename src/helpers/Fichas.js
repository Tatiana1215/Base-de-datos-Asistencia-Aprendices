
const Ficha = require("../models/Fichas")

const fichaHelper = {
    existsCodigo: async (Codigo)=>{
        const exists = await Ficha.findOne({Codigo:Codigo})
        if(exists){
            throw new Error("El codigo ya existe")
        }
    }
}

module.exports = {fichaHelper}