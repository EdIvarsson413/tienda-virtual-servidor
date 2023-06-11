import Comentarios from '../models/Comentarios.js'

// Obtiene todos los comentarios
const obtenerComentario =  async ( req, res ) => {
    // Se extrae el nombre del libro de la url
    const { libro } = req.params;

    try {
        // El nombre se hace insensible a mayusculas y minusculas
        const regex = new RegExp( libro, 'i' )

        // Busca los comentarios por la regex
        const comentarios = await Comentarios.find( { libro: regex } )
            .select( 'nombre comentario libro' );

        // Envia el arreglo de comentarios
        res.json( comentarios );
    } catch( error ) {
        console.log( error );
        return res.status(500).json( { msg: "Error al obtener los comentarios" } );
    }
}

// Agregar un comentarios
const agregarComentario = async ( req, res ) => {
    // Se extraen el nombre de usuario, libro y el comentario del usuario
    const { nombre, comentario, libro } = req.body

    try {
        // Se crea un nuevo docuemnto en el modelo de comenatrios con las variables extraidas
        const nuevoComentario = new Comentarios( { nombre, comentario, libro } );

        // Se guarda el documento
        await nuevoComentario.save();

        // Se envia un mensaje al usuario
        res.status(201).json( { msg: "Tu comentario ha sido agregado, gracias"} );
    } catch (error) {
        res.status(500).json( { error: 'Error al crear el comentario' } );
    }
}

export {
    obtenerComentario,
    agregarComentario,
}