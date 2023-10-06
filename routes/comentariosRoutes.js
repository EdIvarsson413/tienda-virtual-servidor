import express from 'express'
import { agregarComentario, obtenerComentario } from '../controllers/comentariosController.js';
const router = express.Router();

/**
 * @swagger
 * /comentarios/{libro}:
 *   get:
 *     summary: Obtener todos los comentarios de un libro
 *     tags:
 *       - Comentarios
 *     parameters:
 *       - in: path
 *         name: libro
 *         required: true
 *         description: Nombre del libro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comentarios del libro
 *       500:
 *         description: Error en el servidor al obtener los comentarios
 */
router.get( '/:libro', obtenerComentario );

/**
 * @swagger
 * /comentarios/:
 *   post:
 *     summary: Crear un nuevo comentario.
 *     tags:
 *       - Comentarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComentarioRequest'
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente.
 *       500:
 *         description: Error en el servidor al crear el comentario.
 */
router.post( '/', agregarComentario );

export default router;