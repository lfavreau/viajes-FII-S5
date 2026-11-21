import { gql } from '@apollo/client';

//una sola consulta GraphQL solicita los campos necesarios.
export const OPCIONES_VIAJE = gql`
  query OpcionesViaje($id: ID!) {
    opcionesViaje(id: $id) {
      destino {
        id
        ciudad
        pais
      }
      vuelos {
        id
        aerolinea
        origen
        destino
        fecha
        precio
        disponibilidad
      }
      hoteles {
        id
        nombre
        ubicacion
        fechaEntrada
        fechaSalida
        precioNoche
        disponibilidad
      }
    }
  }
`;
