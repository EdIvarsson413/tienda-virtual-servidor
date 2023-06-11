// Incio del servidor (presentación sencilla de los libros en JSON)
import express from "express"
const router = express.Router();

router.get('/', (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('host'); // Obtén la URL base del servidor

    res.send(
        `
            <style>
                a {
                    text-decoration: none;
                    margin: 0 20;
                    color: white;
                }

                body {
                    background-color: #212121;
                    color: white;
                }

                .flex-div {
                    display: flex;
                }
            </style>
        
            <body>
                <h1>Bienvenido al servidor del la tienda virtual uwu</h1>
                <div class="flex-div">
                    <a href="/api/libros">Ver Libros en JSON</a>
                </div>
            </body>
        `
    )
})

export default router