import mongoose from 'mongoose'

// Estructura de un libro
const librosSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            trim: true,
            required: true,
        },
        saga: {
            type: String,
            trim: true,
            required: true,
        },
        autor: {
            type: String,
            trim: true,
            required: true
        },
        sinopsis: {
            type: String, // MongoDB por defecto da soporte a cadenas bastante largas
            trim: true,
            required: true,
        },
        precio: {
            type: Number,
            required: true,
        },
        imagen: {
            type: String, // De la imagen se guarda alguna referencia de esta(como el nombre)
            required: true,
        },
        tipo: {
            type: String, // Tipo se refiere si el libro es un boxset o un libro individual
            required: true
        },
        tokenPromo: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Libros = mongoose.model( "Libros", librosSchema );

export default Libros