import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <section className="intro">
      <span className="etiqueta">Agencia de viajes</span>
      <h1>Elige tu próximo destino</h1>
      <p>Explora destinos y consulta vuelos y hoteles disponibles, con sus fechas y precios.</p>
      <Link className="boton-enlace" to="/destinos">Ver destinos</Link>
      <p className="muted" style={{ marginTop: 20, fontSize: 13 }}>
        Proyecto académico. Todos los datos son simulados.
      </p>
    </section>
  );
}
