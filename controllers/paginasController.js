import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => { // req - lo que enviamos : res - lo que express nos responde

      //Consultar tres viajes del modelo viajes
      const promiseDB = [];
      //EVITA QUE -AYNC- -AWAIT- BLOQUEE EL CODIGO EN ESPERA DE TODOS LOS RESULTADO
      // Y EJECUTA LOS DOS PROMISES AL MISMO TIEMPO
      promiseDB.push( Viaje.findAll({ limit: 3 }) );
      promiseDB.push( Testimonial.findAll({ limit: 3 }) );

      try {
            const resultado = await Promise.all( promiseDB ); //EJECUTA TODOS LO PROMISES

            res.render('inicio', {
                  pagina: 'Inicio',
                  clase: 'home',
                  viajes: resultado[0],
                  testimoniales: resultado[1]
            });            
      } catch (error) {
            console.log(error);
      }

      
}

const paginaNosotros = (req, res) => { // req - lo que enviamos : res - lo que express nos responde

      res.render('nosotros', {
            pagina: 'Nosotros'
      });
}

const paginaViajes = async (req, res) => { // req - lo que enviamos : res - lo que express nos responde
      //Consultar Base de Datos
      const viajes = await Viaje.findAll();

      console.log(viajes);

      res.render('viajes', {
            pagina: 'Próximos Viajes',
            viajes
      });
}

const paginaTestimoniales = async (req, res) => { // req - lo que enviamos : res - lo que express nos responde

      try {
            const testimoniales = await Testimonial.findAll();

            res.render('testimoniales', {
                  pagina: 'Testimoniales',
                  testimoniales
            });
      } catch (error) {
            console.log(error);
      }
}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {

      const { slug } = req.params;

      try {
            const viaje = await Viaje.findOne( { where: { slug } } );
            res.render('viaje', {
                  pagina: 'Informacion Viaje',
                  viaje
            });
            
      } catch (error) {
            console.log(error);
      }
}

export {
      paginaInicio,
      paginaNosotros,
      paginaViajes,
      paginaTestimoniales,
      paginaDetalleViaje
}