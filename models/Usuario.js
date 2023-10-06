import mongoose from "mongoose";
import bcrypt from 'bcrypt'

//Estructura de la base de datos
const usuarioSchema = mongoose.Schema(
    {
        // Campos del para llena
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true // Para que un perfil solo tenga un correo
        },
        token: {
            type: String,
        },
        confirmado: {
            type: Boolean,
            default: false // Sera true hasta que ek usuario revise su correo de confirmaicon
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true // Creara 2 columnas de creado y actualizado
    }
);

// Antes de guardar el password comenzara a hashear la contraseña
usuarioSchema.pre( "save" , async function( next ){
    if( !this.isModified( 'password' ) ){
        // Si el password no ha cambiado termina el proceso de hash antes de que lo haga
        next();
    }
    const salt = await bcrypt.genSalt( 10 );
    this.password = await bcrypt.hash( this.password, salt );
});

usuarioSchema.methods.comprobarPassword = async function( passswordFormulario ){
    // bcrypt hashea un password que viene de un formualrio y lo compara con uno que ya lo está
    return await bcrypt.compare( passswordFormulario, this.password );
}

// Se define el modelo
const Usuario = mongoose.model( "Usuario", usuarioSchema );
export default Usuario;
