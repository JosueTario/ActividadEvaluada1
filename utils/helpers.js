const esTextoValido = (valor) => {
  if (typeof valor !== 'string') {
    return false;
  } else if (valor.trim() === '') {
    return false;
  } else {
    return true;
  }
};

const normalizarPrioridad = (prioridad) => {
  switch (prioridad.trim().toLowerCase()) {
    case 'alta':
      return 'Alta';
    case 'media':
      return 'Media';
    case 'baja':
      return 'Baja';
    default:
      return null;
  }
};

module.exports = { esTextoValido, normalizarPrioridad };