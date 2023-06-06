import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

const checkAuth = async (req, res, next) => {
    try {
        // Se obtiene el token del header y se verifica
        const token = req.headers.authorization?.split(' ')[1];

        // Si no hay token
        if( !token ) throw new Error('Token no válido');

        // Se decodifica el token JWT
        const decoded = jwt.decode(token, process.env.JWT_SECRET);

        // Se obtiene el usuario desde la base de datos
        const usuario = await Usuario.findById(decoded.id).select('-password');

        // Si no se encontró el usuario
        if( !usuario ) throw new Error('Usuario no encontrado');

        // EL documento queda al descubierto pero con - se le indica al documento que no debe retornar
        req.usuario = await Usuario.findById(decoded.id)
        .select("-password -confirmado -token -createdAt -updatedAt -__v");
        next();
    } catch ( error ) { res.status(401).json({ msg: error.message }); }
}

export default checkAuth