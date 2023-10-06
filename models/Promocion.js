import mongoose from "mongoose"

// Estructura de la promocion
const promocionSchema = mongoose.Schema(
    {
        codigo: {
            type: String,
            require: true
        },
        descuento: {
            type: Number,
            require: true
        },
        fechaLimite:{
            type: Number,
            require: true
        },
        tokenPromo: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

const Promocion = mongoose.model( "Promocion" , promocionSchema );

export default Promocion;