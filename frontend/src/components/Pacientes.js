import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

// sacamos las citas
// const Pacientes =  (props) => {
const Pacientes =  ({citas}) => {
    // console.log(props)
    // console.log(citas.length)

    if (citas.length >0) {
        return (
            <Fragment>
                <h1 className="my-5">Administrador de Citas</h1>

                <div className="container mt-5 py-5">
                    <div className="row">
                        <div className="col-12 mb-5 d-flex justify-content-center">
                            {/* NOTA: en REACT necesitamos implementar otro tipo de enlace distinto a <a>: */}
                            {/* <a  href="#" className="btn btn-success text-uppercase py-2 px-5">Crear Cita</a> */}
                            {/* sea este <link> */}
                            <Link  to={'/nueva'} className="btn btn-success text-uppercase py-2 px-5">Crear Cita</Link>
                        </div>
                        <div className="col-md-8 mx-auto">
                            <div className="list-group">
                                {
                                    citas.map( (cita) => {
                                        return (
                                            <Link 
                                                to={`/cita/${cita._id}`} 
                                                key={cita._id} 
                                                className="p-5 list-group-item list-group-item-action felx-colum align-items-start"
                                            >
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h3 className="mb-3">{cita.nombre}</h3>
                                                    <small className="fecha-alta"> {cita.fecha} - {cita.hora} </small>
                                                </div>
                                                <p className="mb-0">{citas.sintomas}</p>
                                                <div className="contacto">
                                                    <p>Cliente: {cita.propietario}</p>
                                                    <p>Teléfono: {cita.telefono}</p>
                                                </div>
                                            </Link>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );    
    }else{
        return (<h2>No hay registros</h2>);
    }
}

export default Pacientes;