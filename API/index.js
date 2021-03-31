// 1) Configuracion del servidor
const express = require('express');
// 2) configrura Mongo
const mongoose = require('mongoose');
// 3) importar las rutas (nota: tambien solo con la ruta a la carpeta es suficiente)
const router = require('./routes');
// 4) para poder recibir daatos de formularios por peticiones POST usamos:
// const bodyParser = require('body-parser');
// 5) importar cors
const cors = require('cors');


// 1.1) crear el servidor
const app = express();

// 5.1) habilitar corse, para DESARROLLO, es decir peticiones de cualquier URL
app.use(cors());

// // 5.2) restringir los dominios, URLs, que pueden hacer solicitudes a nuestra app
// const whitelist = ['http://localhost:3000'];
// const corsOptions={
//     origin: (origin,callback) => {
//         // console.log(origin);
//         const existe = whitelist.some(dominio => dominio===origin);
//         if (existe) {
//             callback(null,true);
//         }else{
//             callback(new Error('---- Acceso Restringido por CORS ----'));
//         }
//     }
// }
// // NOTA IMPORRTANTE: esta restriccion solo debe ser permitida para aplicaciones de alta seguridad
// // donde no se permita el ecceso a dominios publicos.
// app.use(cors(corsOptions));



// 2.1) conectar a mongo
mongoose.Promise = global.Promise;
// 2.2) crear previamente la base de datos
mongoose.connect('mongodb://localhost/api-consultorio',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});


// 4.1) habilitar el body parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
// NOTA: bodyParser ha sido depreciadom ahora podemos usar directamente express
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// 3.1) habilitar routing
app.use('/', router());


// 1.2) arrancar el servidor en un puerto
const puerto = 4000;
app.listen(puerto,  () => {
    console.log(`\n >>> Backend API Server: http://localhost:${puerto} \n`);
});



























