// En el controlador se emplea el modelo para manupular los datos que entran y salen de la peticion
import Usuario from "../models/Usuario.js";
import generarID from "../helpers/generarID.js";
import generarJWT from "../helpers/generarJWT.js";
import checkAuth from "../middleware/checkAuth.js";

const registrarUsario = async (req, res) => {
    // Evitar que se dubliquen correos
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email })

    // Si ya hay un usuario con ese correo
    if (existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Se extraer el cuerpo con datos de la peticion
        const usuario = new Usuario(req.body);

        // Se genera un custom token y se inserta en el campo
        usuario.token = generarID();
        
        if(usuario.nombre.startsWith("Admin")) usuario.admin = true

        // Los datos se almacenan en MongoDB
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;
    // comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ msg: error.message });
    }

    // Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({ msg: error.message });
    }

    // Comprobar passsword
    if (await usuario.comprobarPassword(password)) {
        // Generar el token de usuario
        const tokenUsuario = generarJWT(usuario._id);
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            tokenUsuario,
        });
    } else {
        const error = new Error("El password es incorrecto");
        return res.status(403).json({ msg: error.message });
    }
}

const confirmarUsuario = async (req, res) => {
    const { token } = req.params;

    // Se busca al usaurio que no este confirmado por su token
    const usuarioConfirmar = await Usuario.findOne({ token });

    // Si el token no coincide con ninguno de la base de datos
    if (!usuarioConfirmar) {
        const error = new Error("Token no válido");
        return res.status(403).json({ msg: error.message });
    }

    try {
        // El campo del usuario cambia a true
        usuarioConfirmar.confirmado = true;

        // Comprobado el token y confirmado el usuario el token queda vacio por seguridad
        usuarioConfirmar.token = '';

        // Guarda el estado acutal del documento de la base de datos
        await usuarioConfirmar.save();
        res.json({ msg: "Usuario confirmado correctamente" });
    } catch (error) {
        console.log(error)
    }
}

const perfil = async (req, res) => {
    const { usuario } = req;
    res.json({ usuario })
}

export {
    registrarUsario,
    autenticar,
    confirmarUsuario,
    perfil
}