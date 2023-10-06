import express from 'express'
import { agregarEstrellas, obtenerEstrellas } from '../controllers/estrellasController.js';

const router = express.Router();

/**
 * @swagger
 * /estrellas/{libro}:
 *   get:
 *     summary: Obtener las calificaciones de un libro.
 *     tags:
 *       - Estrellas
 *     parameters:
 *       - in: path
 *         name: libro
 *         required: true
 *         description: Nombre del libro para el cual se desean obtener las calificaciones.
 *         type: string
 *     responses:
 *       200:
 *         description: Calificaciones del libro obtenidas exitosamente.
 *       500:
 *         description: Error en el servidor al obtener las calificaciones.
 */
router.get( '/:libro', obtenerEstrellas );

/**
 * @swagger
 * /estrellas:
 *   post:
 *     summary: Agregar una nueva calificación de estrellas a un libro.
 *     tags:
 *       - Estrellas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstrellasRequest'
 *     responses:
 *       201:
 *         description: Calificación de estrellas agregada exitosamente.
 *       500:
 *         description: Error en el servidor al agregar la calificación de estrellas.
 */
router.post( '/', agregarEstrellas );

export default router;