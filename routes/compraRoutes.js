import express from 'express'
import { obtenerCompras, registrarCompra } from '../controllers/compraController.js'

const router = express.Router();

/**
 * @swagger
 * /compra/:
 *   get:
 *     summary: Obtener todos los registros de compras
 *     tags:
 *       - Compra
 *     responses:
 *       200:
 *         description: Compras obtenidas exitosamente.
 *       500:
 *         description: Error en el servidor .
 */
router.get( '/', obtenerCompras )

/**
 * @swagger
 * /compra/:
 *   post:
 *     summary: Registrar y crear ticket de compara.
 *     tags:
 *       - Compra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompraRequest'
 *     responses:
 *       200:
 *         description: Factura creada.
 *       500:
 *         description: Error en el servidor.
 */
router.post( '/', registrarCompra )

export default router