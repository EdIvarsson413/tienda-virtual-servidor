import mongoose from 'mongoose'

// Estructura de una compra
const compraSchema = mongoose.Schema(
    {
        id_cliente: {
            type: String,
            required: true
        },
        nombre_cliente: {
            type: String,
            required: true
        },
        aplico_promo: {
            type: Boolean,
            required: false
        },
        libros: {
            type: Array,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const Compra = mongoose.model( "Compra", compraSchema )

export default Compra