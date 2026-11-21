import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Estado from '../components/Estado';
import { obtenerDestinos } from '../services/destinos';

export default function Destinos() {
  //useState guarda
  const [destinos, setDestinos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [intento, setIntento] = useState(0);

  //useEffect obtiene
  useEffect(() => {
    let vigente = true;
    setCargando(true);
    setError('');
    obtenerDestinos()
      .then((datos) => { if (vigente) setDestinos(datos); })
      .catch(() => { if (vigente) setError('No fue posible cargar los destinos.'); })
      .finally(() => { if (vigente) setCargando(false); });
    return () => { vigente = false; };
  }, [intento]);

  return (
    <section>
      <h1>Destinos disponibles</h1>
      <p className="subtitulo">Selecciona un destino para consultar vuelos y hoteles.</p>
      {cargando && <Estado titulo="Cargando destinos..." />}
      {!cargando && error && (
        <Estado tipo="error" titulo="No se pudieron obtener los destinos"
          mensaje="Comprueba tu conexión y vuelve a intentarlo."
          reintentar={() => setIntento((n) => n + 1)} />
      )}
      {!cargando && !error && destinos.length === 0 && (
        <Estado tipo="vacio" titulo="No hay destinos disponibles" />
      )}
      {!cargando && !error && destinos.length > 0 && (
        <div className="grilla">
          {destinos.map((destino) => (
            <Link className="tarjeta tarjeta-enlace" key={destino.id} to={`/destinos/${destino.id}`}>
              <span className="etiqueta">{destino.pais}</span>
              <h3>{destino.ciudad}</h3>
              <p className="actividades">{destino.actividades.join(' · ')}</p>
              <span className="etiqueta">Ver vuelos y hoteles</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
