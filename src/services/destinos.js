let cacheDestinos = null;
let solicitudActiva = null;

//reutiliza datos cargados sin REST duplicadas
export async function obtenerDestinos() {
  if (cacheDestinos) return cacheDestinos;
  if (solicitudActiva) return solicitudActiva;

  const base = process.env.NODE_ENV === 'production'
    ? (process.env.PUBLIC_URL || '').replace(/\/$/, '')
    : '';
  solicitudActiva = fetch(`${base}/api/destinos`)
    .then((respuesta) => {
      if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
      return respuesta.json();
    })
    .then((datos) => {
      if (!Array.isArray(datos)) throw new Error('La respuesta de destinos no es válida.');
      cacheDestinos = datos;
      return datos;
    });

  try {
    return await solicitudActiva;
  } finally {
    solicitudActiva = null;
  }
}
