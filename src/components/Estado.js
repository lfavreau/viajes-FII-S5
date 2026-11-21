export default function Estado({ tipo = 'carga', titulo, mensaje, reintentar }) {
  return (
    <div className={`estado ${tipo === 'error' ? 'error' : ''}`} role={tipo === 'error' ? 'alert' : 'status'}>
      {tipo === 'carga' && <span className="spinner" aria-hidden="true" />}
      <strong>{titulo}</strong>
      {mensaje && <p>{mensaje}</p>}
      {reintentar && <button type="button" onClick={reintentar}>Reintentar</button>}
    </div>
  );
}
