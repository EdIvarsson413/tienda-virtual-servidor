import mongoose from "mongoose"

const comentariosSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        comentario: {
            type: String,
            required: true,
        },
        libro: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

const Comentarios = mongoose.model( "Comentarios", comentariosSchema );

export default Comentarios;