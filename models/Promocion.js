import mongoose from "mongoose"

// Estructura de la promocion
const promocionSchema = mongoose.Schema(
    {
        codigo: {
            type: String,
            required: true
        },
        descuento: {
            type: Number,
            required: true
        },
        fechaLimite:{
            type: Number,
            required: true
        },
        tokenPromo: {
            type: String,
            required: true
        },
        nombreLibro: {
            type: String,
            required: true
        },
        portadaLibro: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Promocion = mongoose.model( "Promocion" , promocionSchema );

export default Promocion;