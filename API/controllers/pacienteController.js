const Paciente = require('../models/Paciente');

// Cuando se crea un nuevo cliente
exports.nuevoPaciente =  async (req, res, next) => {
    // Nota antes de recibir los datos hay que configurar bodyparser en el index al arrancar el servidor.
    // console.log(req.body);

    // crear obj de paciente con datos del request
    const paciente = new Paciente(req.body);
    try {
        // ysamos metodo de mongoose
        await paciente.save();
        res.json({
            // mensaje: 'El cliente se agrego correctamente'
            mensaje: 'El cliente se agrego correctamente: '+req.body.nombre
        });
    } catch (error) {
        console.log(error);
        next();
    }
    

}

// obtener todos los registros de pacientes
exports.getPacientes =  async (req, res, next) => {

    try {
        // usamos el metodo find de mongoose para traer todos los registros
        const pacientes = await Paciente.find();
        // res.json({
        //     mensaje: pacientes
        // });
        // res.json({data: pacientes});
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

// obtener un paciente
exports.getPaciente =  async (req, res, next) => {

    try {
        // usamos el metodo findById de mongoose para traer un registro
        const paciente = await Paciente.findById(req.params.id);
        // nota: .id es el que se define en la URL del router
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

// actualizar un registro
exports.actualizaPaciente =  async (req, res, next) => {

    try {
        // usamos el metodo findOneAndUpdate de mongoose para actualizar un registro
        const paciente = await Paciente.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new:true}
        );
        // nota: .id es el que se define en la URL del router
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}


// elimina un registro
exports.eliminaPaciente =  async (req, res, next) => {

    try {
        // usamos el metodo findOneAndDelete de mongoose para actualizar un registro
        const eliminado = await Paciente.findOneAndDelete({_id: req.params.id});
        // console.log(eliminado);
        // nota: .id es el que se define en la URL del router
        if (eliminado) {
            res.json({mensaje: 'Registro elimindo'});
        } else {
            res.json({mensaje: 'No existe ese registro'});
        }
        
    } catch (error) {
        console.log(error);
        next();
    }
}