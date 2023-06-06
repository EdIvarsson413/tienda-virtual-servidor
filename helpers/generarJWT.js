import jwt from 'jsonwebtoken'

const generarJWT = (id, role = 'user') => {
    return jwt.sign(
        { id, role }, // informacion a cambio de la autenticacion 
        process.env.JWT_SECRET + role, // Firma del JWT
        { expiresIn: '30d' } // Tiempo para que el token caduque
    );
}

export default generarJWT;