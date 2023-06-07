import express from 'express'
import { agregarEstrellas, obtenerEstrellas } from '../controllers/estrellasController.js';

const router = express.Router();

// Ruta GET para obtener todas las estrellas
router.get('/:libro', obtenerEstrellas);

// Ruta POST para crear una nueva estrella
router.post('/', agregarEstrellas);

export default router;