import Compra from '../models/Compra.js'
import { crearPDF } from '../helpers/generarTicket.js'

// Obtener todas las compras
const obtenerCompras = async (req, res) => {
    try {
        // Revisar si hay registros de compras
        const compras = await Compra.find()
        
        if( compras.length === 0 ) 
            return res.status( 404 ).json({ msg: "No se han registrado compras :(" });

        res.json(compras)
    } catch (error) {
        res.status( 500 ).json({ msg: "Error en el servidor" })
    }
}

// Registro de compra y generacion de factura en PDF en las descargas
const registrarCompra = async (req, res) => {
    const { idCliente, nombreCliente, libros, aplicoPromo } = req.body
    
    try {
        // Si ocurre un error en el ticket, no se registra la compra
        const alerta = await crearPDF( nombreCliente, libros, aplicoPromo );
        
        // Si la alerta viene con un mensaje diferente
        if( !alerta.includes("Error") ) {
            // Registrar compra
            await Compra.create({ 
                id_cliente: idCliente,
                nombre_cliente: nombreCliente,
                aplico_promo: aplicoPromo,
                libros: libros
            });

            res.json({ msg: alerta });
        } else {
            return res.status( 500 ).json({ msg: alerta });
        }

    } catch( error ) {
        console.log(error)
        res.status( 500 ).json({ msg: "Error en el servidor" })
    }
}

export {
    obtenerCompras,
    registrarCompra
}