// Traemos el objeto mongoose desde la dependencia
const mongoose = require("mongoose")

// Creamos una constante llamada Schema con un objeto de mongoose
const Schema = mongoose.Schema

// Instanciamos el objeto Schema enviando como propiedad la estructura 
const messageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

}, { timestamps: true })

// Exportamos el modelo del esquema
module.exports = mongoose.model("MessageReturn", messageSchema)