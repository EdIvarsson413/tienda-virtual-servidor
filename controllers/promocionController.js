import Promocion from '../models/Promocion.js'
import Libros from '../models/Libros.js'

// Obtener todos los cupones
const obtenerCupones = async (req, res) => {
    try {
        // Se hace la consulta y se filtra lo que se desea retornar
        const cupones = await Promocion.find()
            .select('_id codigo descuento fechaLimite tokenPromo');

        // Se retorna toda la consulta en un array
        res.json( cupones );
    } catch (error) {
        console.log(error);
        res.status( 500 ).json({ msg: 'Error al obtener los cupones' });
    }
}

// Obtener cupones por token de promocion
const obtenerCuponesToken = async (req, res) => {
    // Se obtiene el token del producto en promocion
    const { tokenPromo } = req.params; 

    try {
        // Se hace la consulta y se filtran los resultados
        const cuponesExisten = await Promocion.find({tokenPromo})
            .select('_id codigo descuento fechaLimite tokenPromo');

        // Si no hay cupones
        if( cuponesExisten.length === 0) {
            const error = new Error( "Cupones no encontrados" );
            return res.status( 404 ).json({ msg: error.message });
        }

        // Si hay cupones, los retorna
        res.json( cuponesExisten );
    } catch (error) {
        console.log(error);
        return res.status( 500 ).json({ msg: "Error en el servidor" });
    }
}

const crearPromocion = async (req, res) => {
    // Se estrae la url de la peticion
    const { concatenacion } = req.params;

    // Se segmenta
    const [ cantidad, codigo, descuento ,fecha, token ] = concatenacion.split('$');

    try {
        // Se crea un objetopara agrpar la informacion del cupon
        const cupon = {
            codigo,
            descuento,
            fechaLimite: fecha,
            tokenPromo: token
        };

        // Si se van a crear más de un cupon
        if( cantidad > 1 ) {
            for( let i = 0; i < cantidad; i++ )
                await Promocion.create( cupon );

            return res.json({ msg: `Promoción creada,${cantidad} cupones han sido creados` });
        }

        // Si solo es un cupon
        await Promocion.create(cupon);
        return res.json({ msg: "Promoción creada, se creo un cupón" })
    } catch (error) {
        console.log(error);
    }
}

// Eliminar promociones por su token de promocion
const eliminarPromocion = async (req, res) => {
    // Se estrae el token de promocion de la url
    const { tokenPromo } = req.params;

    try {
        // Se realiza la consulta y a la vez se eliminan los registros
        await Promocion.deleteMany({tokenPromo});
        
        // Se busca el libro por su token y se extrae el nombre
        const { nombre } = await Libros.findOne({tokenPromo}).select('nombre');
        return res.json({ msg: `Se han eliminado las promociones de ${nombre}` })
    } catch( error ) {
        console.log(error);
    }
}

const aplicarPromocion = async (req, res) => {
    // Extrae el codigo del cuerpo de la peticion
    const { codigo, fecha } = req.body;
    
    try {
        // Buscar el primer registro con el codigo correspondiente
        const cupon = await Promocion.findOne({codigo});

        if( cupon ){
            if( fecha <= cupon.fechaLimite ) {
                res.json({ msg: "Cupón registrado ;)", descuento: cupon.descuento });
                await Promocion.deleteOne(cupon);
                return
            } else {
                return res.status( 404 ).json({ msg: "Cupón caducado :(" });
            }
        } else 
            return res.status( 404 ).json({ msg: "Cupón no es válido o caducó :(" });
    } catch (error) {
        console.log(error);
        return res.status( 500 ).json({ msg: "Error en el servidor" });
    }
}

export {
    crearPromocion,
    obtenerCupones,
    obtenerCuponesToken,
    eliminarPromocion,
    aplicarPromocion
}