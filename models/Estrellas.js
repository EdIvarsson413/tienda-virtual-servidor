import mongoose from "mongoose"

const estrellasSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            require: true,
        },
        estrellas: {
            type: Number,
            require: true,
        },
        libro: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

const Estrellas = mongoose.model("Estrellas", estrellasSchema);

export default Estrellas;