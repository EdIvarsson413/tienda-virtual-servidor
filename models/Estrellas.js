import mongoose from "mongoose"

const estrellasSchema = mongoose.Schema(
    {
        // Nombre del cliente
        nombre: {
            type: String,
            require: true,
        },
        estrellas: {
            type: Number,
            require: true,
        },
        // Nombre del libro
        libro: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

const Estrellas = mongoose.model( "Estrellas", estrellasSchema );

export default Estrellas;