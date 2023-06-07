import passport from 'passport'
import { Strategy as estrategiaLocal } from 'passport-local'
import { Strategy as estrategiaGoogle } from 'passport-google-oauth20'
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

// Configuración de la estrategia de Google
passport.use(new estrategiaGoogle(
    {
        clientID: '746804414065-620ej3m90kpd45gjmfmp30eiq2phqjm5.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: 'http://localhost:2908/api/login/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Verificar si el usuario ya existe
            const usuarioExiste = await Usuario.findOne({ googleId: profile.id });

            // Si ya existe no se hace nada
            if (usuarioExiste) return done(null, usuarioExiste);

            // Si no existe se crea
            const nuevoUsuario = new Usuario({
                googleId: profile.id,
                email: profile.emails[0].value,
                nombre: profile.displayName,
                accessToken
            })

            // Se guarda el usuario
            await nuevoUsuario.save();

            // Devolvemos el usuario creado
            return done(null, nuevoUsuario);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
        done(err, usuario);
    });
});


export default passport;