import mongoose from 'mongoose'

const librosSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            trim: true,
            require: true,
        },
        saga: {
            type: String,
            trim: true,
            require: true,
        },
        autor: {
            type: String,
            trim: true,
            require: true
        },
        sinopsis: {
            type: String,
            trim: true,
            require: true,
        },
        precio: {
            type: Number,
            require: true,
        },
        imagen: {
            type: String,
            require: true,
        },
        tipo: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

const Libros = mongoose.model( "Libros", librosSchema );

export default Libros