# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura limpia con Typescrypt

# dev

1. Clonar el archivo env.template a .env
2. Configurar las variables de entorno

```
PORT=3000
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false
```

3. Ejecutar el comando `npm install`

4. Levantar la base de datos

`````
docker compose up -d
````

4. Ejecutar `npm run dev`
`````
