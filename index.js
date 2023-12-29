import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import conectarDB from './config/db.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import authPassport from './routes/authPassport.js'
import librosRoutes from './routes/librosRoutes.js'
import estrellasRoutes from './routes/estrellasRoutes.js'
import comentariosRoutes from './routes/comentariosRoutes.js'
import promocionRoutes from './routes/promocionRoutes.js'
import compraRoutes from './routes/compraRoutes.js'
import tags from './helpers/swagger/tags.js'
import schemas from './helpers/swagger/schemas.js'

// Inicio del servidor 
const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

// Configuracion de Swagger
const opciones = {
    swaggerDefinition: {
        info: {
            title: 'Librerias Castor API',
            version: '1.0.0',
            description: 'Servidor de la tienda virtual \n\n\nNota: Acceso a la API http://tuhost:tupuerto/api/'
        },
        tags,
        components: {
            schemas
        }
    },
    apis: [ './routes/*.js' ]
}

const swaggerSpec = swaggerJSDoc(opciones);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

if( process.env.CORS === 'si' ) { 
    app.use( cors( corsOptions ) ); 
    console.log('Aplicando config de CORS');
} else {
    app.use( cors('*') ); 
    console.log('Todos pueden hacer peticiones al servidor'); 
}

// Routing
app.use( '/api/usuarios', authPassport );
app.use( '/api/libros', librosRoutes );
app.use( '/api/estrellas', estrellasRoutes );
app.use( '/api/comentarios', comentariosRoutes );
app.use( '/api/promociones', promocionRoutes);
app.use( '/api/compra/', compraRoutes );

const port = process.env.PORT || 3000

const servidor = app.listen(port, () => {
    console.log(`Servidor corriendo`);
    console.log(`Visitar http://localhost:${port}/api-docs para ir a la documentación`);
})

// Socket.io
import { Server } from 'socket.io'
import desglosarPromo from './helpers/desglosarPromo.js'
import buscarLibro from './helpers/buscarLibro.js'

// Construir el web socket a base de este servidor
const io = new Server( servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    }
})

// Abrir conexion
io.on('connection', socket => {
    // -------- Eventos de socket.io -------- //

    // Promociones
    socket.on('cargando promociones', (cadena) => {
        socket.join('admin-promos')
    })

    socket.on('nueva promocion', async (promocion) => {
        // Desglosar cadena y hacer grupo de cupones
        const promo = await desglosarPromo( promocion )

        io.sockets.to('admin-promos').emit('agregar promocion', promo)
    })

    socket.on('eliminar promocion', tokenPromo => {
        io.sockets.to('admin-promos').emit('eliminando promocion', tokenPromo)
    })


    // Libros
    socket.on('cargando libros', cadena => {
        socket.join('admin-libros')
    })

    socket.on('nuevo libro', async ( libro ) => {
        // Buscar y traer los datos del libro de la BD
        const libroRetornar = await buscarLibro( libro )

        io.sockets.to('admin-libros').emit('libro agregado', libroRetornar)
    })
})