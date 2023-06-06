// Middleware de verificación de rol de administrador
export default (req, res, next) => {
    const { usuario } = req;
    if (usuario.role === 'admin') {
        // Si el usuario tiene el rol de administrador, permitir el acceso
        next();
    } else {
        // Si el usuario no tiene el rol de administrador, devolver un mensaje de error
        return res.status(403).json({ msg: 'Acceso denegado. Se requiere rol de administrador.' });
    }
};