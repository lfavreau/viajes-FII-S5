import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { OPCIONES_VIAJE } from '../graphql/consultas';
import TarjetaOpcion from '../components/TarjetaOpcion';
import Estado from '../components/Estado';

export default function DetalleDestino() {
  //id de destino
  const { id } = useParams();

  //apollo consulta el mock graphql y actualiza estado, cache-first lo evita si ya se consultó
  const { data, loading, error, refetch } = useQuery(OPCIONES_VIAJE, {
    variables: { id },
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  const detalle = data?.opcionesViaje;

  return (
    <section>
      <Link className="volver" to="/destinos">← Volver a destinos</Link>
      {loading && <Estado titulo="Consultando vuelos y hoteles..." />}
      {!loading && error && (
        <Estado tipo="error" titulo="No fue posible consultar el viaje"
          mensaje={error.message || 'Vuelve a intentarlo.'}
          reintentar={() => refetch()} />
      )}
      {!loading && !error && !detalle && (
        <Estado tipo="vacio" titulo="No se encontró información para ese destino" />
      )}
      {!loading && !error && detalle && (
        <>
          <span className="etiqueta">{detalle.destino.pais}</span>
          <h1>{detalle.destino.ciudad}</h1>
          <p className="subtitulo">Opciones de vuelo y alojamiento para tu viaje</p>
          <div className="secciones">
            <section>
              <h2>Vuelos</h2>
              <div className="opciones">
                {detalle.vuelos.length === 0 && <p>No hay vuelos disponibles.</p>}
                {detalle.vuelos.map((vuelo) => <TarjetaOpcion key={vuelo.id} tipo="vuelo" opcion={vuelo} />)}
              </div>
            </section>
            <section>
              <h2>Hoteles</h2>
              <div className="opciones">
                {detalle.hoteles.length === 0 && <p>No hay hoteles disponibles.</p>}
                {detalle.hoteles.map((hotel) => <TarjetaOpcion key={hotel.id} tipo="hotel" opcion={hotel} />)}
              </div>
            </section>
          </div>
        </>
      )}
    </section>
  );
}
