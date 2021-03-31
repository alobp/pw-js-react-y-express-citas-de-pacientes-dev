import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// 
import clienteAxios from './config/axios'

// componentes
import Pacientes from "./components/Pacientes";
import NuevaCita from "./components/NuevaCita";
import Cita from "./components/Cita";

function App() {

  // Setate de la app
  const [citas, guardarCitas] = useState([]);
  // a) para recargar los registros despues de agregar uno nuevo
  const [consultarAPI, setConsultarAPI_DB] = useState(true);


  // se ejecuta en cada cambio o desde el arranque de la app
  useEffect(() => {

    // a.1)
    if (consultarAPI) {
      // pedimos al backen los registros a mostrar
      const consultarAPI =  () => {
        // colocamos las peticiones al backend
        clienteAxios.get('/pacientes')
          .then( respuesa => {
            // guardar la respuesta del back
            // console.log(respuesa);
            // console.log(respuesa.data);
            guardarCitas(respuesa.data);

            // a.2) deshabilitar la consulta
            setConsultarAPI_DB(false);

          })
          .catch( error => {
            console.log(error);
          })
      }
      // la mandamos a llamar
      consultarAPI();
    }

  }, 
  // a.3) para lograr que react reconozca los cambios de consultarAPI 
  // pasamos la variable por el siguiente parametro,
  // de esta forma cada vez que cambie, react ejecutara de nuevo esta funcion.
  [consultarAPI]);
  
  return (
    <Router>
      <Switch>

        {/* cargar los componentes del rauter */}
        <Route exact path='/'
          // NOTA: de esta manera no se pueden para atributos  por lo cual hacemos:
          // component={Pacientes}
          component={ () => <Pacientes citas={citas} /> }
        ></Route>

        <Route exact path='/nueva'
          component={ () => <NuevaCita setConsultarAPI_DB={setConsultarAPI_DB}/>}
        ></Route>

        <Route exact path='/cita/:id'        
          // component={Cita}
          // otra forma distinta de mandar a llamar un componente pasando parametros seria:
          render={
             (props) => {
              // console.log(props)
              // console.log(props.match.params.id);

              // extraemos la cita por id para pasarla despues por parametro a otro modulo
              const cita = citas.filter(cita=>cita._id===props.match.params.id);
              return (
                <Cita 
                  cita={cita[0]} 
                  setConsultarAPI_DB={setConsultarAPI_DB}
                />
              );
            }
          }
        ></Route>

      </Switch>
    </Router>


  );
}

export default App;
