import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import conectarDB from './config/db.js';
import inicio from './middleware/inicio.js';
import usuarioRoutes from './routes/usuarioRoutes.js'
import authPassport from './routes/authPassport.js'
import librosRoutes from '../servidor/routes/librosRoutes.js'

// Inicio del servidor 
const app = express();
app.use(express.json());

// dotenv busca las variables de entorno 
// e inicia instancia de MongoDB (si no existe, se creara)
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
// app.use(cors('*'))

// Routing
app.use('/', inicio);
// app.use('/api/usuarios', usuarioRoutes);
app.use('/api/usuarios', authPassport);
app.use('/api/libros', librosRoutes);

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
})