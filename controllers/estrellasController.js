import Estrellas from '../models/Estrellas.js'

const obtenerEstrellas = async (req, res) => {
    const { libro } = req.params;

    try {
        const regex = new RegExp(libro, 'i')
        const estrellas = await Estrellas.find({ libro: regex });
        res.json(estrellas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las estrellas' });
    }
}

const agregarEstrellas = async (req, res) => {
    const { nombre, estrellas, libro } = req.body
    try {
        let calificación = await Estrellas.findOne({libro});

        if( calificación ) {
            calificación.estrellas = estrellas;
            calificación.libro = libro;
        } else{
            calificación = new Estrellas({ nombre, estrellas, libro });
        }

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