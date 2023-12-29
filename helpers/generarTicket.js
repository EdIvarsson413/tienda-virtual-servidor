import pdf from 'html-pdf'
import fs from 'fs'
import path from 'path'
import os from 'os'
import { fileURLToPath } from 'url'

let ubicacionPlantilla, rutaCarpetaDescargas;
let rutaFinalPdf, contenidoHtml, formateador;

/**
 * Se inician las referencias:
 *  - Ubicacion de la plantilla del pdf
 *  - Obtener ruta de la carpeta de descargas
 *  - Ruta a donde irá el pdf final
 *  - Obtención del contenido de la plantilla
 *  - Formato del dinero
*/
const inicializarReferencias = () => {
    ubicacionPlantilla = fileURLToPath( new URL( './plantilla.html', import.meta.url ));
    rutaCarpetaDescargas = path.join( os.homedir(), 'Downloads' );
    rutaFinalPdf = path.join( rutaCarpetaDescargas, `ticket-${fecha()}.pdf` );
    contenidoHtml = fs.readFileSync( ubicacionPlantilla, 'utf8' );
    formateador = new Intl.NumberFormat( "en", { style: 'currency', 'currency': 'MXN' } );
}

const rellenarTabla = ( libros ) => {
    let tabla = "";
    let total = 0;

    // Se hace recorrido por el arreglo de los libros
    for( const libro of libros ) {
        // Se calcula el subtotal y total del pedido
        const subtotal = libro.precio * libro.unidades;
        total += subtotal;

        // Por cada objeto se añadirá un renglon a la tabla de HTML
        tabla += 
        `
            <tr>
                <td>${libro.nombre}</td>
                <td>${libro.unidades}</td>
                <td>${formateador.format( libro.precio )}</td>
                <td>${formateador.format( subtotal )}</td>
            </tr>
        `
    }

    return { tabla, total };
}

// Formato de fecha
const fecha = () => {
    const date = new Date()
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const año = date.getFullYear();
    return (`${dia}-${mes}-${año}`)
}

// Si no se aplicaron promociones se quita la celda en la tabla
const celdaPromocion = () => {
    // Se busca el renglon especifico para marcar la promocion
    const regextr = new RegExp('<tr[^>]*id="promocion"[^>]*>[\\s\\S]*?</tr>', 'g');
    contenidoHtml = contenidoHtml.replace( regextr, '' );
}

// Concatenacion de toda la informacion
const reemplazarContenido = ( nombreCliente, libros, aplico_promo ) => {
    const { tabla, total} = rellenarTabla( libros )
    
    // Tabla
    contenidoHtml = contenidoHtml.replace( '{{tablaProductos}}', tabla );

    // Fecha y cliente
    contenidoHtml = contenidoHtml.replace( '{{cliente}}', nombreCliente);
    contenidoHtml = contenidoHtml.replace( '{{fecha}}', fecha )

    // Celda de total
    contenidoHtml = contenidoHtml.replace( '{{total}}', formateador.format( total ));

    // Aplico promociones?
    if( !aplico_promo )
        celdaPromocion( aplico_promo );
}

// Creacion del nuevo contenido en PDF
const crearPDF = async ( nombreCliente, libros, aplico_promo ) => {
    inicializarReferencias();
    reemplazarContenido( nombreCliente, libros, aplico_promo );

    return new Promise( (resolve, reject) => {
        pdf.create( contenidoHtml ).toFile( rutaFinalPdf, (error) => {
            if( error ) {
                // console.log(`Error creando PDF: ${error.message}`);
                reject( new Error( 'Error al crear ticket' ));
            } else {
                // console.log('PDF creado correctamente');
                resolve("Ticket creado, revisa tu carpeta de descargas ;)");
            }
        })
    })
}

export { crearPDF }