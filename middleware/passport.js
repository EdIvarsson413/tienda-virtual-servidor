import passport from 'passport'
import { Strategy as estrategiaLocal } from 'passport-local'
import bcrypt from 'bcrypt'
import Usuario from '../models/Usuario.js';

// Confguración de la estrategia
passport.use(new estrategiaLocal(
    {
        // Estos campos toman referecnia del modelo
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            // Busca el usuario en el modelo
            const usuario = await Usuario.findOne({ email });

            // Si no lo encuentra
            if (!usuario) { return done(null, false, { message: 'Correo no registrado o incorrecto' }) };

            // Obtener contraseña y compararla con el campo aterior
            const contraseñaCoincide = await bcrypt.compare(password, usuario.password);

            // Si no coincide la contraseña
            if (!contraseñaCoincide) { return done(null, false, { message: 'Contraseña incorrecta' }) };

            // Si la autenticsación funcionó
            return done(null, usuario);
        } catch (error) { return done(error) }
    }
))

export default passport;