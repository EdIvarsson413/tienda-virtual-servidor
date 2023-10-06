import express from 'express'
import { 
    confirmar, 
    iniciarSesion, 
    obtenerPerfil, 
    registrarUsuario,
} from '../controllers/authController.js';
import passAuth from '../middleware/passAuth.js'

const router = express.Router();

/**
 * @swagger
 * /registro/:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags:
 *       - Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroRequest'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la solicitud o el usuario ya existe
 *       500:
 *         description: Error en el servidor al registrar el usuario
 */
router.post( '/registro', registrarUsuario );

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión de usuario.
 *     tags:
 *       - Usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso e información del usuario
 *       401:
 *         description: No se pudo iniciar sesión. La cuenta no está confirmada o las credenciales son incorrectas
 */
router.post( '/login', iniciarSesion );

/**
 * @swagger
 * /confirmar/{token}:
 *   get:
 *     summary: Confirmar la cuenta de usuario mediante el token de confirmación
 *     tags:
 *       - Usuario
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token de confirmación enviado al correo electrónico del usuario
 *         type: string
 *     responses:
 *       200:
 *         description: Usuario confirmado correctamente
 *       403:
 *         description: No se pudo confirmar la cuenta. El token no es válido o ya se usó.
 */
router.get( '/confirmar/:token', confirmar );
router.get( '/perfil', passAuth, obtenerPerfil );

export default router;