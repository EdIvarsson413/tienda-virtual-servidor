import express from 'express'
import { agregarComentario, obtenerComentario } from '../controllers/comentariosController.js';
const router = express.Router();

// Ruta GET para obtener todos los comentarios
router.get( '/:libro', obtenerComentario );

// Ruta POST para crear un nuevo comentario
router.post( '/', agregarComentario );

export default router;