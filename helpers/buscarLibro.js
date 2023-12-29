import Libros from "../models/Libros.js"

export default async ( nombre ) => {
    // La funcion toma el nombre del libro recibido del frontend
    try {
        // Realiza el mismo proceso de selección de un libro como en el controlador
        const libroExiste = await Libros.findOne({ nombre: nombre })
            .select('_id nombre saga autor sinopsis precio imagen tipo tokenPromo');

        if( !libroExiste )
            return

        // No es necesario devolver un JSON
        return libroExiste
    } catch (error) {
        console.log(error)
    }
}