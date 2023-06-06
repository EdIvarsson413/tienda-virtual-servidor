import Libros from '../models/Libros.js'

const agregarLibro = async (req, res) => {
    try {
        const libroAlmacendo = await Libros.create(req.body);
        res.json(libroAlmacendo);
    } catch (error) {
        console.log(error)
    }
}

// Obtener libro por nombre
const obtenerLibro = async (req, res) => {
    // Se trae el nombre del libro de la url
    const { nombre } = req.params;

    try {
        // Se usa una regex para permitir mayusculas o minisuclas 
        const regex = new RegExp(nombre, 'i');

        // Se hace la consulta a base del regex
        const libroExiste = await Libros.findOne({ nombre: regex })
            .select('_id nombre saga autor sinopsis precio imagen tipo');

        // Si no encontro el libro
        if (!libroExiste) {
            const error = new Error("Libro no encontrado");
            return res.status(404).json({ msg: error.message });
        }

        // Si lo encontro
        res.json(libroExiste)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error en el servidor" });
    }
}

// Obtener libro por id, traer sus comentarios y estrellas
const obtenerLibroId = async (req, res) => {
    // Se trae el nombre del libro de la url
    const { nombre } = req.params;

    try {
        // Se usa una regex para permitir mayusculas o minisuclas 
        const regex = new RegExp(nombre, 'i');

        // Se hace la consulta a base del regex
        const libroExiste = await Libros.findOne({ nombre: regex })
            .select('_id nombre saga autor sinopsis precio imagen tipo');

        // Si no encontro el libro
        if (!libroExiste) {
            const error = new Error("Libro no encontrado");
            return res.status(404).json({ msg: error.message });
        }

        // Si lo encontro
        res.json(libroExiste)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Error en el servidor" });
    }
}

// Se trae todo los libros
const obtenerLibros = async (req, res) => {
    try {
        // Con find se obtienen los libros
        const catalogo = await Libros.find()
            // se obtiene los atrbitos que fueron definidos en el modelo
            .select('_id nombre saga autor sinopsis precio imagen tipo');

        // Envia el catalogo a un JSON
        res.json(catalogo)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener el catálogo de libros' });
    }
}

const editarLibro = async (req, res) => { 
    // Se obtiene el id
    const { id } = req.params;

    // Se sacan los campos escritos y se engloban en un solo objeto
    const objetoBody = req.body;

    try {
        // Se edita el libro desde el modelo, el id se conserva
        const libroEditado = await Libros.updateOne({_id: id}, objetoBody);

        // Si no hubieron cambios puede significar que el libro existe
        if( libroEditado.modifiedCount > 0 ) res.status(200).json({ msg: "Libro editado con exito" });
        else res.status(404).json({ msg: "Libro no encontrado" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
}

const eliminarLibro = async (req, res) => { 
    // se obtiene el libro de la url
    const { id } = req.params;

    try {
        // Se elimina el documento desde el modelo a base de su id
        const libroEliminado = await Libros.deleteOne({_id: id});
        res.status(200).json({ msg: "Libro eliminado correctamente" });
    } catch (error) {
        
    }
}

export {
    agregarLibro,
    obtenerLibro,
    obtenerLibroId,
    obtenerLibros,
    editarLibro,
    eliminarLibro,
}