import React, {Fragment} from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
// como se pierde el history y otros props, por la forma de pasar una funcion entre modulos,
// hay que importar la siguiente funcion, y mandar mediante esta funcion nuestro modulo NuevaCita
import {withRouter} from 'react-router-dom';
// 
import clienteAxios from '../config/axios'



const NuevaCita =  (props) => {

    // generar el state como objeto
    const [cita, guardarCita] = useState({
        nombre:'',
        propietario:'',
        fecha:'',
        hora:'',
        telefono:'',
        sintomas:''
    })

    // leer los datos del formulario
    const capturaDatosFormulario =  e => {
        // con name y value nostraemos los valores de los campos
        // console.log(e.target.name);
        // console.log(e.target.value);
        guardarCita({
            // traemos una copia de cita
            ...cita,
            // y sobre escribimos el atributo del campo
            [e.target.name]:e.target.value
        });

    }

    // enviar una peticion a la API backend
    const crearNuevaCita =  (e) => {
        e.preventDefault();

        // enviar la peticion por axios
        clienteAxios.post('/pacientes', cita)
            .then( (respuesta) => {
                console.log(respuesta);

                props.setConsultarAPI_DB(true);

                // redireccionar
                props.history.push('/');
            });
    }

    return (
        <Fragment>
            <h1 className="my-5">Crear Nueva Cita</h1>

            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        {/* NOTA: en REACT necesitamos implementar otro tipo de enlace distinto a <a>: */}
                        {/* sea este <link> */}
                        <Link  to={'/'} className="btn btn-success text-uppercase py-2 px-5">Volver</Link>
                    </div>

                    {/* FORMULARIO */}
                    <div className="col-md-8 mx-auto">
                        <form 
                            onSubmit={crearNuevaCita}
                            className="bg-white p-5 bordered">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre Mascota</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    id="nombre" 
                                    name="nombre" 
                                    placeholder="Nombre Mascota" 
                                    onChange={capturaDatosFormulario}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="propietario">Nombre Propietario</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    id="propietario" 
                                    name="propietario" 
                                    placeholder="Nombre Propietario" 
                                    onChange={capturaDatosFormulario}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="telefono">Teléfono</label>
                                <input 
                                    type="tel" 
                                    className="form-control form-control-lg" 
                                    id="telefono" 
                                    name="telefono" 
                                    placeholder="Teléfono" 
                                    onChange={capturaDatosFormulario}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="fecha">Fecha Alta</label>
                                <input 
                                    type="date" 
                                    className="form-control form-control-lg" 
                                    id="fecha" 
                                    name="fecha"
                                    onChange={capturaDatosFormulario}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="hora">Hora Alta</label>
                                <input 
                                    type="time" 
                                    className="form-control form-control-lg" 
                                    id="hora" 
                                    name="hora"
                                    onChange={capturaDatosFormulario}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="sintomas">Síntomas</label>
                                <textarea 
                                    className="form-control" 
                                    name="sintomas"
                                    rows="6"
                                    onChange={capturaDatosFormulario}
                                ></textarea>
                            </div>
                            <input 
                                type="submit" 
                                className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold" 
                                value="Crear Cita"  
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>

    );
}

export default withRouter(NuevaCita);