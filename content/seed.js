import Libros from '../models/Libros.js'
import semillaLibros from './semillaLibros.js'

const implantar = async () => {
    try {
        await Libros.create(semillaLibros);
    } catch (error) {
        console.log(error)
    }
}

implantar()