import express from 'express'
import 
    {
        crearPromocion,
        obtenerCupones,
        obtenerCuponesToken,
        eliminarPromocion,
        aplicarPromocion
    } 
from '../controllers/promocionController.js'
import checkAuth from '../middleware/passAuth.js'
import checkRole from '../middleware/checkRole.js'

const router = express.Router();

/**
 * @swagger
 * /promociones/:
 *   get:
 *     summary: Obtiene todos los cupones de todos los libros.
 *     tags:
 *       - Promociones
 *     responses:
 *       200:
 *         description: Lista de todos los cupones
 *       500:
 *         description: Error en el servidor
 */
router.get( '/', obtenerCupones );

/**
 * @swagger
 * /promociones/{tokenPromo}:
 *   get:
 *     summary: Obtener cupones por token de promocion
 *     tags:
 *       - Promociones
 *     parameters:
 *       - in: path
 *         name: tokenPromo
 *         required: true
 *         description: token de la promoción.
 *         type: string
 *     responses:
 *       200:
 *         description: Cupones del producto y su informacion.
 *       404:
 *         description: Cupones no encontrados.
 *       500:
 *         description: Error en el servidor.
 */
router.get( '/:tokenPromo', obtenerCuponesToken );

/**
 * @swagger
 * /promociones/aplicar/:
 *   post:
 *     summary: Aplicar promoción con un cupón
 *     tags:
 *       - Promociones
 *     requestBody:
 *       description: Datos del cupón.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 description: Código del cupón
 *               fecha:
 *                 type: number
 *                 description: Fecha de aplicación del cupón
 *     responses:
 *       200:
 *         description: Entero del descuento y mensaje.
 *       404-1:
 *          description: Cupón no válido o caducado.
 *       404-2:
 *         description: Cupón caducado.
 *       500:
 *         description: Error en el servidor.
 */
router.post( '/aplicar', checkAuth ,aplicarPromocion )

/**
 * @swagger
 * /promociones/{concatenacion}:
 *    post:
 *      summary: Crear promoción
 *      tags: 
 *        - Promociones
 *      parameters:
 *        - in: path
 *          name: concatenacion
 *          required: true
 *          description: Cantidad, Codigo, Fecha, Descuento y Token concatenados
 *      responses:
 *        200-1:
 *          description: Promocion creada, <Cantidad> cupones han sido creados
 *        200-2:
 *          description: Promocion creada, un cupón ha sido creado
 */
router.post( '/:concatenacion', checkAuth, checkRole, crearPromocion );

/**
 * @swagger
 * /promociones/{tokenPromo}:
 *    delete:
 *      summary: Eliminar todos los cupones de un libro
 *      tags:
 *        - Promociones
 *      parameters:
 *        - in: path
 *          name: tokenPromo
 *          required: true
 *          description: Token de promoción
 *          type: string
 *      responses:
 *        200:
 *          description: Se han eliminado las promociones del producto
 *        404:
 *          description: No hay cupones para eliminar
 *        500:
 *          description: Error en el servidor
 */
router.delete( '/:tokenPromo', checkAuth, checkRole, eliminarPromocion )

export default router