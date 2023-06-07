import express from 'express'
import 
    { 
        agregarLibro, 
        obtenerLibros, 
        eliminarLibro, 
        editarLibro, 
        obtenerLibro, 
        obtenerLibroId 
    } from '../controllers/librosController.js';
import checkAuth from '../middleware/passAuth.js';
import checkAdminRole from '../middleware/checkRole.js';

const router = express.Router();

// Obtener todos los libros
router.get('/', obtenerLibros)

// Obtener libro en el campod de texto
router.get('/:nombre', obtenerLibro)

// Obtener libro por id
router.get('/id/:id', obtenerLibroId);

// Para agregar libro
router.post("/", checkAuth, checkAdminRole, agregarLibro);

// Toda operacion con id puede tener todas las acciones de HTTP juntas
router.route("/:id")
    .put( checkAuth, checkAdminRole, editarLibro)
    .delete( checkAuth, checkAdminRole, eliminarLibro);

export default router