// Este es un helper que implementa el SMPT de Mailtrap
// solo recomienda usar este servidor para pruebas
import nodemailer from 'nodemailer'

export default async (datos) => {
    // El ombre de usuario, su email y el token correspondiente son extraidos
    const { nombre, email, token } = datos;

    // Credenciales que ofrece Mailrap que ofrece al usuario dueño del servidor 
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Informacion del email
    const info = await transport.sendMail({
        from: '"Librerias Castor" <cuentas@libcastor.com>',
        to: email,
        subject: 'Librerías Castor - Confirma tu cuenta',
        text: 'Comprueba tu cuenta en Librerías Castor',
        html: `
            <p>Hola: ${nombre}, comprueba tu cuenta en Librerías Castor</p>
            <p>Tu cuenta ya está caso lista, solo debes comprobar en el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });
}