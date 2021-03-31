import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import clienteAxios from '../config/axios';

// para las confirmaciones antes de eliminar, usaremos sweetalert
import Swal from 'sweetalert2'

const Cita =  (props) => {

    // NOTA: como se recarga la pagina si pierde el STATE con toda la info, por lo cual debemos de:
    if (!props.cita) {
        // redireccionar a home
        props.history.push('/');
        return null;
    } 

    // extraemos la cita si existe
    const cita = props.cita;

    // eliminar registro
    const eliminarCita = id => {
        // console.log(id)

        // 1) al usar sweet alert, mopdificamos un poco, y solo despues de la confirmacion del usuario, mandamos a eliminar a la API
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Una cita eliminada no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado',
                    'La cita ha sido eliminada',
                    'success'
                );

                // hacemos la peticion de eliminar a la api
                clienteAxios.delete(`/pacientes/${id}`)
                .then( respuesta => {
                    // las funciones por parametro se pueden leer sin pedo alguno desde cualquier lado
                    props.setConsultarAPI_DB(true);

                    // return console.log(respuesta);
                    // redireccionar a home
                    props.history.push('/');
                })
                .catch( (error) => {
                    console.log(error)
                });

            }
        });
    }



    return (
        <Fragment>
            <h1 className="my-5"> Asunto: {cita.nombre} </h1>
            <div className="container mt-5 py-5">
                <div className="row">

                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link  to={'/'} className="btn btn-success text-uppercase py-2 px-5">Volver</Link>
                    </div>

                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                            <div className="list-group-item list-group-item-action flex-column align-items-center p-5">

                                <div className="d-flex w-100 justify-content-between">
                                    <h3 className="mb-3">{cita.nombre}</h3>
                                    <small className="fecha-alta"> {cita.fecha} - {cita.hora} </small>
                                </div>                                
                                <div className="contacto">
                                    <p>Cliente: {cita.propietario}</p>
                                    <p>Teléfono: {cita.telefono}</p>
                                </div>
                                <p className="mt-3 mb-5 border p-3">Asunto: {cita.sintomas}</p>

                                {/* agregar eliminar registro */}
                                <div className="d-flex">
                                    <button 
                                        type="button" 
                                        className="btn btn-danger col text-upercase py-2 px-5 font-weight-bold"
                                        // NOTA: si mandas a llamar una funcion se ejecutra inmediatamente y no podras pasar el parametro deseado
                                        // por lo cual es necesario usar en estos casos los Arrow Functions
                                        onClick={ () => eliminarCita(cita._id) }
                                    >
                                        Eliminar &times;
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </Fragment>
    );
}

export default withRouter(Cita);