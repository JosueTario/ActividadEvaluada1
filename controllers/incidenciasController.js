const { esTextoValido, normalizarPrioridad } = require('../utils/helpers');

const incidencias = [];
let siguienteId = 1;

const pendiente = (req, res) => {
  res.json({ mensaje: 'Pendiente de implementar' });
};

const registrarIncidencia = (req, res) => {
  const { empleado, area, descripcion, prioridad } = req.body || {};

  if (!esTextoValido(empleado) || !esTextoValido(area) ||
      !esTextoValido(descripcion) || !esTextoValido(prioridad)) {
    return res.status(400).json({
      mensaje: 'Todos los campos son obligatorios y no pueden estar vacíos'
    });
  }

  const prioridadValida = normalizarPrioridad(prioridad);
  if (prioridadValida === null) {
    return res.status(400).json({
      mensaje: 'La prioridad solo puede ser Alta, Media o Baja'
    });
  }

  const nuevaIncidencia = {
    id: siguienteId,
    empleado: empleado.trim(),
    area: area.trim(),
    descripcion: descripcion.trim(),
    prioridad: prioridadValida,
    estado: 'Pendiente'
  };

  incidencias.push(nuevaIncidencia);
  siguienteId++;

  res.status(201).json({ mensaje: 'Incidencia registrada correctamente' });
};