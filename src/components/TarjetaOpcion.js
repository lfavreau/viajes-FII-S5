const precioCLP = (valor) => new Intl.NumberFormat('es-CL', {
  style: 'currency', currency: 'CLP', maximumFractionDigits: 0,
}).format(valor);

const fechaCL = (fecha) => fecha.split('-').reverse().join('/');

//componente reutilizable de vuelos y hoteles
export default function TarjetaOpcion({ tipo, opcion }) {
  const esVuelo = tipo === 'vuelo';

  return (
    <article className="tarjeta">
      <h3>{esVuelo ? opcion.aerolinea : opcion.nombre}</h3>
      <p className="opcion-meta">
        {esVuelo
          ? `${opcion.origen} → ${opcion.destino}`
          : opcion.ubicacion}
      </p>
      <p className="opcion-meta">
        {esVuelo
          ? `Fecha: ${fechaCL(opcion.fecha)}`
          : `Entrada: ${fechaCL(opcion.fechaEntrada)} · Salida: ${fechaCL(opcion.fechaSalida)}`}
      </p>
      <p className="precio">
        {precioCLP(esVuelo ? opcion.precio : opcion.precioNoche)}{' '}
        <small>{esVuelo ? 'por pasaje' : 'por noche'}</small>
      </p>
      <span className={opcion.disponibilidad ? 'disponible' : 'agotado'}>
        {opcion.disponibilidad ? 'Disponible' : 'No disponible'}
      </span>
    </article>
  );
}
