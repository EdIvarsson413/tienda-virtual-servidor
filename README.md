# Librerías App - Tienda Virtual

Este es el servidor de la aplicación de la tienda virtual. Esta REST API es una aplicación hecha en ExpressJs, siguiendo la metodología MVC ( Modelo, Vista, Controlador ) y ya se encuentra documentada, por lo que solo se aclaran algunos detalles.

## Dependencias

Para instalar dependencias usar
```
npm install
```

## Variables de entorno
+ **CORS**: Aquí se define si se quiere aplicar la configuracion de CORS (si/no) 
+ **MONGO_URL**: URL de una instancia de MongoDB
+ **PORT**: Puerto del servidor
+ **JWT_SECRET**: Palabra que forma parte del JWT
+ **ADMIN_NOMENCLATURE**: Parte de la contraseña que se concatena a la contraseña del usuario que da desde el sitio web
+ **FRONTEND_URL**: URL del sitio web

- **EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT**: Credenciales que proporciona Mailtrap para el sevidor de correos de prueba

## Cambios realizados

[Ver cambios realizados](./docs/bitacora%20de%20cambios.md)