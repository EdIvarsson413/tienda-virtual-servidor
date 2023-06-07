import Comentarios from '../models/Comentarios.js'

// Obtiene todos los comentarios
const obtenerComentario =  async (req, res) => {
    const { libro } = req.params;

    try {
        const regex = new RegExp(libro, 'i')
        const comentarios = await Comentarios.find({ libro: regex })
            .select('nombre comentario libro');

        res.json(comentarios);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error al obtener los comentarios" });
    }
}

const agregarComentario = async (req, res) => {
    const { nombre, comentario, libro } = req.body
    try {
        const nuevoComentario = new Comentarios({nombre, comentario, libro});
        const comentarioGuardado = await nuevoComentario.save();
        res.status(201).json({ msg: "Tu comentario ha sido agregado, gracias"});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el comentario' });
    }
}

export {
    obtenerComentario,
    agregarComentario,
}