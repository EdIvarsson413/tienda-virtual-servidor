import Estrellas from '../models/Estrellas.js'

// Se extrae la calificacion que ha hehco el usuario en un libro
const obtenerEstrellas = async (req, res) => {
    // Se extrae el nombre del libro
    const { libro } = req.params;

    try {
        // El nombre se hace insensible a mayusculas y minusculas
        const regex = new RegExp(libro, 'i')

        // Se busca la calificacion por la regex
        const estrellas = await Estrellas.find({ libro: regex });

        // Se envia la calificacion
        res.json(estrellas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las estrellas' });
    }
}

// Se agrega la calificacion que un usuario le hizo a un libro
const agregarEstrellas = async (req, res) => {
    // Se extraen los nombre del usuario y libro junto con la calificacion
    const { nombre, estrellas, libro } = req.body

    try {
        // Se extrae la calificacion por el nombre del libro
        let calificación = await Estrellas.findOne({libro});

        // Si un libro ya fue calificado
        if( calificación ) {
            // Se reemplazan la cantidad de estrellas
            calificación.estrellas = estrellas;

            // Se reemplaza el libro
            calificación.libro = libro;
        } else{
            // Si no existe se crea una nueva calificación
            calificación = new Estrellas({ nombre, estrellas, libro });
        }

        // Se guarda la calificacion en el modelo y se envia una respuesta
        await calificación.save();
        res.status(201).json({ msg: "Su calificación ha sido tomada en cuenta" });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la estrella' });
    }
}

export {
    obtenerEstrellas,
    agregarEstrellas
}