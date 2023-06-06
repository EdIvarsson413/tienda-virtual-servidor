import express from 'express'
import { confirmar, iniciarSesion, obtenerPerfil, registrarUsuario } from '../controllers/authController.js';
import passAuth from '../middleware/passAuth.js'
const router = express.Router();


router.post('/registro', registrarUsuario);

router.post('/login', iniciarSesion);

router.get('/confirmar/:token', confirmar);

router.get('/perfil', passAuth, obtenerPerfil);

export default router;