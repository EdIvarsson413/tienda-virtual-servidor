import mongoose from "mongoose";

// Conectar la base de datos a la instancia de MongoDB
const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewURLParser: true,
            useUnifiedTopology: true
        });

        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);
    } catch (error) {
        console.log(`error: ${error}`);
        process.exit(1);
    }
}

export default conectarDB;