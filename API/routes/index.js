const express = require('express');
const router = express.Router();
const pacienteCtrl = require('../controllers/pacienteController');


module.exports = function () {
    
    // agregar nuevos pacientes via POST
    router.post('/pacientes',
        pacienteCtrl.nuevoPaciente
    );

    // obtener pacientes via GET
    router.get('/pacientes',
        pacienteCtrl.getPacientes
    );

    // obtener un paciente via GET
    router.get('/pacientes/:id',
        pacienteCtrl.getPaciente
    );

    // actualizar un paciente via PUT
    router.put('/pacientes/:id',
        pacienteCtrl.actualizaPaciente
    );

    // elimina un paciente via PUT
    router.delete('/pacientes/:id',
        pacienteCtrl.eliminaPaciente
    );

    return router;
};