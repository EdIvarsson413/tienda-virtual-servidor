export default {
    LibroRequest: {
        type: 'object',
        properties: {
            nombre: {
                description: 'Nombre del libro o boxset',
                type: 'string',
            },
            saga: {
                description: 'Saga al que pertenece',
                type: 'string',
            },
            autor: {
                description: 'Nombre del autor',
                type: 'string',
            },
            sinopsis: {
                description: 'Sinopsis del libro o boxset',
                type: 'string',
            },
            precio: {
                description: 'Precio del libro o boxset',
                type: 'number',
            },
            imagen: {
                description: 'Referencia a la imagen',
                type: 'string',
            },
            tipo: {
                description: '¿Es un libro o boxset?',
                type: 'string',
            },
            tokenPromo: {
                description: 'Token de promoción (opcional)',
                type: 'string',
            },
        },
    },
    ComentariosRequest: {
        type: 'object',
        properties: {
            nombre: {
                type: 'string',
                description: 'Nombre del usuario que hace el comentario',
            },
            comentario: {
                type: 'string',
                description: 'Contenido del comentario',
            },
            libro: {
                type: 'string',
                description: 'Nombre del libro al que se refiere el comentario',
            },
        }
    },
    EstrellasRequest: {
        type: 'object',
        properties: {
            nombre: {
                type: 'string',
                description: 'Nombre del usuario que califica.',
            },
            estrellas: {
                type: 'number',
                description: 'Cantidad de estrellas otorgadas.',
            },
            libro: {
                type: 'string',
                description: 'Nombre del libro calificado.',
            },
        },
        required: ['nombre', 'estrellas', 'libro'],
    },
    LoginRequest: {
        type: "object",
        properties: {
            email: {
                type: "string",
                description: "Dirección de correo electrónico del usuario."
            },
            password: {
                type: "string",
                description: "Contraseña del usuario."
            }
        },
        required: ["email", "password"]
    },
    RegistroRequest: {
        type: "object",
        properties: {
            nombre: {
                type: "string",
                description: "Nombre del usuario."
            },
            email: {
                type: "string",
                description: "Dirección de correo electrónico del usuario."
            },
            password: {
                type: "string",
                description: "Contraseña del usuario."
            }
        },
        required: ["nombre", "email", "password"]
    },
    ComentariosEditarRequest: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                description: 'Id del comentario.',
            },
            comentario: {
                type: 'string',
                description: 'Contenido del comentario.',
            },
            libro: {
                type: 'string',
                description: 'Nombre del libro al que se refiere el comentario.',
            },
        }
    },
    CompraRequest: {
        type: 'object',
        properties: {
            id_cliente: {
                type: 'string',
                description: 'Id del cliente'
            },
            nombre_cliente: {
                type: 'string',
                description: 'Nombre del cliente'
            },
            libros: {
                type: 'array',
                description: 'Lista de libros a pedir'
            }
        }
    },
}