import mongoose from "mongoose"

const comentariosSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            require: true
        },
        comentario: {
            type: String,
            require: true,
        },
        libro: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true
    }
)

const Comentarios = mongoose.model("Comentarios", comentariosSchema);

export default Comentarios;