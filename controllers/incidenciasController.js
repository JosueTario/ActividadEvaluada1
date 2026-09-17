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

const listarIncidencias = (req, res) => {
  res.json(incidencias);
};

const buscarIncidencia = (req, res) => {
  const id = Number(req.params.id);
  const incidencia = incidencias.find((inc) => inc.id === id);

  if (!incidencia) {
    return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
  }

  res.json(incidencia);
};

const cambiarEstado = (req, res) => {
  const id = Number(req.params.id);
  const { estado } = req.body || {};

 
  const incidencia = incidencias.find((inc) => inc.id === id);
  if (!incidencia) {
    return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
  }

  
  if (!esTextoValido(estado)) {
    return res.status(400).json({ mensaje: 'El estado es obligatorio' });
  }

  let nuevoEstado;
  switch (estado.trim().toLowerCase()) {
    case 'pendiente':
      nuevoEstado = 'Pendiente';
      break;
    case 'en proceso':
      nuevoEstado = 'En Proceso';
      break;
    case 'resuelta':
      nuevoEstado = 'Resuelta';
      break;
    case 'cancelada':
      nuevoEstado = 'Cancelada';
      break;
    default:
      return res.status(400).json({
        mensaje: 'Estado inválido. Use: Pendiente, En Proceso, Resuelta o Cancelada'
      });
  }
  incidencia.estado = nuevoEstado;
  res.json({ mensaje: 'Estado actualizado correctamente' });


};

const eliminarIncidencia = (req, res) => {
  const id = Number(req.params.id);

  
  const indice = incidencias.findIndex((inc) => inc.id === id);

  
  if (indice === -1) {
    return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
  }

  
  incidencias.splice(indice, 1);

  res.json({ mensaje: 'Incidencia eliminada correctamente' });
};


const contarPorEstado = (estado) => {
  return incidencias.filter((inc) => inc.estado === estado).length;
};


const obtenerEstadisticas = (req, res) => {
  res.json({
    totalIncidencias: incidencias.length,
    pendientes: contarPorEstado('Pendiente'),
    enProceso: contarPorEstado('En Proceso'),
    resueltas: contarPorEstado('Resuelta'),
    canceladas: contarPorEstado('Cancelada')
  });
};

const clasificarIncidencia = (req, res) => {
  const id = Number(req.params.id);
  const incidencia = incidencias.find((inc) => inc.id === id);

  if (!incidencia) {
    return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
  }

  let clasificacion;
  switch (incidencia.prioridad) {
    case 'Alta':
      clasificacion = 'Crítica';
      break;
    case 'Media':
      clasificacion = 'Importante';
      break;
    case 'Baja':
      clasificacion = 'Normal';
      break;
    default:
      clasificacion = 'Sin clasificar';
  }

  res.json({ id: incidencia.id, clasificacion });
};

module.exports = {
  registrarIncidencia,
  listarIncidencias,
  buscarIncidencia,
  cambiarEstado,
  eliminarIncidencia,
  obtenerEstadisticas,
  clasificarIncidencia,};

