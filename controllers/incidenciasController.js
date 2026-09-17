const { esTextoValido, normalizarPrioridad } = require('../utils/helpers');

const incidencias = [];
let siguienteId = 1;

const pendiente = (req, res) => {
  res.json({ mensaje: 'Pendiente de implementar' });
};