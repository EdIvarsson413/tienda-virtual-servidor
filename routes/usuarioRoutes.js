import express from "express";
const router = express.Router();
import { registrarUsario, autenticar, confirmarUsuario, perfil } from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

// Atentificacion, registro y confirmacion de usuario
router.post("/", registrarUsario); // Crea un nuevo usuario

// Ruta para la autenticacion
router.post("/login", autenticar); 

// Para confirmar el usuario y vaciar el token de los registros
router.get("/confirmar/:token", confirmarUsuario);

// Primero comprueba los datos del usuario, si todo esta bien pasa al siguiente middleware (perfil)
router.get("/perfil", checkAuth, perfil);

export default router;