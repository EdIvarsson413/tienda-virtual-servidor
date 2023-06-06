import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js';

const checkAuth = async (req, res, next) => {
    // Se guardara el token de JWT 
    let token;

    // Se obtiene el token del header y ademas se regunta si empieza con Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // El token se separa para tener solo el JWT
            token = req.headers.authorization.split(" ")[1];

            // Se decodifica el JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // EL documento queda al descubierto pero con - se le indica al documento que no debe retornar
            req.usuario = await Usuario.findById(decoded.id)
            .select("-password -confirmado -token -createdAt -updatedAt -__v");

            console.log(req.usuario)
            return next();
        } catch (error) {
            return res.status(404).json({ msg: "Hubo un error" })
        }
    }

    // Si no hay un token
    if (!token) {
        const error = new Error("Token no valido");
        res.status(401).json({ msg: error.message });
    }
    next();
}

export default checkAuth;