import mongoose from "mongoose"

const estrellasSchema = mongoose.Schema(
    {
        // Nombre del cliente
        nombre: {
            type: String,
            required: true,
        },
        estrellas: {
            type: Number,
            required: true,
        },
        // Nombre del libro
        libro: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Estrellas = mongoose.model( "Estrellas", estrellasSchema );

export default Estrellas;