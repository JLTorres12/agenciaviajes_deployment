import express from 'express';
import router from '../routes/index.js';
import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config({ path: 'variables.env' });

const app = express();

//Conectar la base de datos
db.authenticate()
      .then( () => console.log('base de datos conectada') )
      .catch( error => console.log(error) )

//Definir Host
const host = process.env.HOST || '0.0.0.0';

//Definir puerto
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {
      console.log(res);
      const year = new Date();

      res.locals.ActualYear = year.getFullYear();
      res.locals.nombresitio = "Agencia de Viajes";
      return next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

//Definir la carpeta Publica
app.use(express.static('public'));

//Agregar Router
app.use('/', router);

app.listen(port, host, () => {
      console.log(`El servidor esta funcionando`);
});