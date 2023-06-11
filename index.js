import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import conectarDB from './config/db.js';
import inicio from './middleware/inicio.js';
import authPassport from './routes/authPassport.js'
import librosRoutes from './routes/librosRoutes.js'
import estrellasRoutes from './routes/estrellasRoutes.js'
import comentariosRoutes from './routes/comentariosRoutes.js'

// Inicio del servidor 
const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

// Configuracion de CORS
const whiteList = [ process.env.FRONTEND_URL ];
const corsOptions = {
    origin: function(origin, callback) {
        if( whiteList.includes(origin) ) {
            // Puede consultar a la API
            callback(null, true);
        }
        else {
            // No esta permitido
            callback( new Error('Error de CORS'));
        }
    }
}
app.use( cors( corsOptions ) );

// Routing
app.use( '/', inicio );
app.use( '/api/usuarios', authPassport );
app.use( '/api/libros', librosRoutes );
app.use( '/api/estrellas', estrellasRoutes );
app.use( '/api/comentarios', comentariosRoutes );

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
})