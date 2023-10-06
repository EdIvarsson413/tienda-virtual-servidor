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

/**
 * @swagger
 * /libros/:
 *   get:
 *     summary: Obtiene todos los libros
 *     tags:
 *       - Libros
 *     responses:
 *       200:
 *         description: Lista de todos los libros
 *       500:
 *         description: Error al obtener el catalogo
 */
router.get( '/', obtenerLibros )

/**
 * @swagger
 * /libros/{nombre}:
 *   get:
 *     summary: Obtener un libro por su nombre
 *     tags:
 *       - Libros
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: Nombre del libro o boxset
 *         type: string
 *     responses:
 *       200:
 *         description: Libro obtenido con su información
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get( '/:nombre', obtenerLibro )
/**
 * @swagger
 * /libros/id/{id}:
 *   get:
 *     summary: Obtener un libro por su id
 *     tags:
 *       - Libros
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del libro o boxset
 *         type: string
 *     responses:
 *       200:
 *         description: Libro obtenido con su información
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get( '/id/:id', obtenerLibroId );

/**
 * @swagger
 * /libros/:
 *   post:
 *     summary: Crear un nuevo libro o boxset
 *     tags:
 *       - Libros
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LibroRequest'
 *     responses:
 *       200:
 *         description: Libro agregado correctamente
 *       500:
 *         description: Error en el servidor
 */
router.post( "/", checkAuth, checkAdminRole, agregarLibro );

/**
 * @swagger
 * /libros/{id}:
 *   put:
 *     summary: Editar un libro o boxset existente
 *     tags:
 *       - Libros
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del libro que se va a editar
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LibroRequest'
 *     responses:
 *       200:
 *         description: Libro editado correctamente
 *       404:
 *         description: Libro no encontrado
 *       500:
 *         description: Error en el servidor
 *   delete:
 *      summary: Eliminar un libro o boxset existente
 *      tags:
 *        - Libros
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID del libro que se va a eliminar
 *          type: string
 *      responses:
 *        200:
 *          description: Libro eliminado correctamente
 */
router.route( "/:id" )
    .put( checkAuth, checkAdminRole, editarLibro )
    .delete( checkAuth, checkAdminRole, eliminarLibro );

export default router