import Promocion from '../models/Promocion.js'
import Libros from '../models/Libros.js'

// Obtener todos los cupones
const obtenerCupones = async (req, res) => {
    try {
        // Se hace la consulta y se filtra lo que se desea retornar
        const cupones = await Promocion.find()
            .select('_id codigo descuento fechaLimite tokenPromo nombreLibro portadaLibro');

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
    // Se estrae el cuerpo de la peticion
    const { concatenacion } = req.body;
    
    // Se segmenta
    const [ cantidad, codigo, descuento ,fecha, token ] = concatenacion.split('$');
    
    try {
        // Buscar el libro por su token de promocion
        const libro = await Libros.findOne({ tokenPromo: token });
        
        if( !libro ) {
            const error = new Error( 'Libro sin Id de promocion, agregelo' )
            res.status(404).json({ msg: error.message })
            return
        }

        // Si se van a crear más de un cupon
        if( cantidad > 1 ) {
            for( let i = 0; i < cantidad; i++ ) {
                // Se le concatena un carcater unico para que el cupon no sea usado
                // mas de una vez
                let aux = codigo.concat(i);
                
                // Se crea un objeto para agrpar la informacion del cupon
                const cupon = {
                    codigo: aux,
                    descuento,
                    fechaLimite: fecha,
                    tokenPromo: token,
                    nombreLibro: libro.nombre,
                    portadaLibro: libro.imagen
                };
                
                await Promocion.create( cupon );
            }

            return res.json({ msg: `Promoción creada,${ cantidad } cupones han sido creados` });
        }

        // Si solo es un cupon
        await Promocion.create({
            codigo,
            descuento,
            fechaLimite: fecha,
            tokenPromo: token,
            nombreLibro: libro.nombre,
            portadaLibro: libro.imagen
        });

        return res.json({ msg: "Promoción creada, se creo un cupón" })
    } catch (error) {
        console.log(error)
        return res.status( 500 ).json({ msg: "Error en el servidor" })
    }
}

// Eliminar promociones por su token de promocion
const eliminarPromocion = async (req, res) => {
    // Se estrae el token de promocion de la url
    const { tokenPromo } = req.params;

    try {
        // Se realiza la consulta y a la vez se eliminan todos los registros
        // que contengan el token
        await Promocion.deleteMany({ tokenPromo });
        
        // Se busca el libro por su token y se extrae el nombre
        const { nombre } = await Libros.findOne({ tokenPromo }).select( 'nombre' );
        return res.json({ msg: `Se han eliminado las promociones de : ${ nombre }` })
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


        // Busca si el cupon existe y no pasa de la fecha limite
        if( cupon ){
            if( fecha <= cupon.fechaLimite ) {
                res.json(
                    { 
                        msg: "Verifica el nuevo precio en el carrito",
                        tokenPromo: cupon.tokenPromo,
                        descuento: cupon.descuento,
                        aplico_promo: true
                    }
                );

                // Elimna el cupon para evitar el uso constante del cupon
                await Promocion.deleteOne(cupon);
                return;
            } else {
                return res.status( 404 ).json({ msg: "Cupón caducado :(" });
            }
        } else 
            return res.status( 404 ).json({ msg: "Cupón no válido :(" });
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