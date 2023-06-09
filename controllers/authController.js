// En el controlador para el registro y login de los usuarios (medio local)
import Usuario from '../models/Usuario.js'
import generarID from '../helpers/generarID.js'
import generarJWT from '../helpers/generarJWT.js'
import passport from '../middleware/passport.js'
import emails from '../helpers/emails.js'

const registrarUsuario = async ( req, res, next ) => {
    // se sacon los campos del body
    const { nombre, email, password } = req.body;

    // Se busca el usuario si ya existe
    const usuarioExiste = await Usuario.findOne( { email } );

    // Si ya hay un usuario con ese correo
    if ( usuarioExiste ) {
        const error = new Error( "Usuario ya registrado" );
        return res.status(400).json( { msg: error.message } );
    }

    try {
        // Crea un nuevo usuario
        const nuevoUsuario = new Usuario();

        // Entran los datos a los campos
        nuevoUsuario.nombre = nombre;
        nuevoUsuario.email = email;
        nuevoUsuario.password = password;
        nuevoUsuario.token = generarID();

        // Verficación para cambiar el rol
        if ( nombre.startsWith( 'Admin' ) && password.includes( process.env.ADMIN_NOMENCLATURE ) ) nuevoUsuario.role = 'admin'

        // Se registra el usuario en la base de datos
        await nuevoUsuario.save();

        // Enviar el email de confirmacion
        emails({
            nombre: nuevoUsuario.nombre,
            email: nuevoUsuario.email,
            token: nuevoUsuario.token
        })

        // Envia mensaje de aviso al cliente
        res.json( { msg: "Usuario registrado, revisa tu email para confirmar tu cuenta" } );
    } catch( error ) { next( error ) }
}

const iniciarSesion = async ( req, res, next ) => {
    // Se usa el metodo authenticate desde el middleware de passport 
    // failureFlash habilita un mensaje flash
    passport.authenticate('local', { failureFlash: true }, async ( error, usuario, info ) => {
        if ( error ) return next( error );

        try {
            // Si el usuario no esta autenticado
            if ( !usuario ) return res.status(401).json( { msg: info.message } );

            // Si esta autenticado, genera un JWT
            const jwt = generarJWT( usuario.id, usuario.role );

            // Si el usuario ya confirmo su cuenta
            if ( usuario.confirmado !== false ) {
                return res.json(
                    {
                        msg: "Inicio de sesión exitoso",
                        id: usuario.id,
                        nombre: usuario.nombre,
                        email: usuario.email,
                        jwt
                    }
                );
            }
            else {
                return res.status(401).json( { msg: "Tu cuenta no esta confirmada aún" } );
            }
        } catch( error ) { return next( error ); }
    })( req, res, next );
}

const confirmar = async ( req, res ) => {
    // Se obtiene el token
    const { token } = req.params;

    try {
        // Se busca el ususario en el modelo en base al token
        const usuarioConfirmar = await Usuario.findOneAndUpdate(
            { token }, // Busca el documento por el token
            { confirmado: true, token: '' } // Cuando lo encuentre cambia estos campos
        )

        // Si no se encontro el usuario, el token no existe
        if( !usuarioConfirmar ) throw new Error( "Token no válido" );

        res.json( { msg: "Usuario confirmado" } )
    } catch( error ) { res.status(403).json( { msg: error.message } ) }
}

// Despues del login se ejecuta este middleware
const obtenerPerfil = async ( req, res ) => {
    const { usuario } = req;
    res.json( usuario )
}

export {
    registrarUsuario,
    iniciarSesion,
    confirmar,
    obtenerPerfil,
}