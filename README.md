# Librerías App - Tienda Virtual

Este es el servidor de la aplicación de la tienda virtual. Esta REST API es una aplicación hecha en ExpressJs, siguiendo la metodología MVC ( Modelo, Vista, Controlador ) y ya se encuentra documentada, por lo que solo se aclaran algunos detalles.

## Dependencias

Para instalar dependencias usar
```
npm install
```

## Variables de entorno
+ CORS: Aquí se define si se quiere aplicar la configuracion de CORS (si/no) 
+ MONGO_URL: URL de una instancia de MongoDB
+ PORT: Puerto del servidor
+ JWT_SECRET: Palabra que forma parte del JWT
+ ADMIN_NOMENCLATURE: Contraseña para registrar la credencial del usuario Administrador
+ FRONTEND_URL: URL del sitio web

- EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT: Credenciales que proporciona Mailtrap para el sevidor de correos de prueba

## Cambios realizados

+ Promociones
    - Modelo, rutas y controladores para la promoción de libros ( 05/10/23 )
+ Documentación con Swagger ( 05/10/23 )
+ Redacción del README ( 05/10/23 )