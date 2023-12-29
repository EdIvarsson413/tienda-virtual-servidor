import express from 'express'
import { 
    agregarComentario, 
    obtenerComentario,
    editarComentario,
    eliminarComentario
} from '../controllers/comentariosController.js';
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


/**
 * @swagger
 * /comentarios/{id}:
 *   put:
 *     summary: Editar un comentario por id.
 *     tags:
 *       - Comentarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del comentario
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComentariosEditarRequest'
 *     responses:
 *       200:
 *         description: Comentario editado correctamente
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error en el servidor
*   delete:
 *      summary: Eliminar un comentario.
 *      tags:
 *        - Comentarios
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del comentario.
 *          type: string
 *      responses:
 *        200:
 *          description: Comentario eliminado correctamente.
 */
router.route( '/:id' )
    .put( editarComentario )
    .delete( eliminarComentario )

export default router;