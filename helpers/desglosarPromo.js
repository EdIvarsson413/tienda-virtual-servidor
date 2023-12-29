import Libros from "../models/Libros.js"

export default async ( cadena ) => {
    // La funcion recibe la cadena concatenada y realiza el mismo 
    // proceso de creacion de cupones en el controlador 
    const [ cantidad, codigo, descuento ,fecha, token ] = cadena.split('$');
    
    let nuevaPromocion = [];

    try {
        // Buscar nombre del libro y portada por el token
        const libro = await Libros.findOne({ tokenPromo: token });
        
        // Si se van a crear más de un cupon
        if( cantidad > 1 ) {
            for( let i = 0; i < cantidad; i++ ) {
                // Se le concatena un carcater unico para que el cupon no sea usado
                // mas de una vez
                let aux = codigo.concat(i);
                
                // Se crea un objeto para agrpar la informacion del cupon
                const cupon = {
                    codigo: aux,
                    descuento: parseFloat(descuento),
                    fechaLimite: parseInt(fecha),
                    tokenPromo: token,
                    nombreLibro: libro.nombre,
                    portadaLibro: libro.imagen
                };
                
                // El cupon no va a la base de datos, eso lo hace en el controlador
                nuevaPromocion.push( cupon )
            }
        }

        return nuevaPromocion
    } catch (error) {
        console.log(error)
    }
}