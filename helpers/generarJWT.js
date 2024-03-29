import jwt from 'jsonwebtoken'

const generarJWT = (id, role = 'user') => {
    return jwt.sign(
        { id, role }, // Informacion a cambio de la autenticacion 
        process.env.JWT_SECRET + role, // Firma del JWT
        { expiresIn: '30d' } // Tiempo para que el token caduque (30 dias)
    );
}

export default generarJWT;