import { delay, graphql, http, HttpResponse } from 'msw';

//info real proporcionada por googl, google vuelos y google hoteles
const destinos = [
  {
    id: 'cusco',
    ciudad: 'Cusco',
    pais: 'Perú',
    aeropuerto: 'Aeropuerto Internacional Alejandro Velasco Astete (CUZ)',
    zonaHoraria: 'America/Lima (UTC-5)',
    moneda: 'PEN',
    actividades: [
      'Historia (Sacsayhuamán, Qorikancha, Camino Inca)',
      'Caminatas (Montaña de 7 Colores, Laguna Humantay)',
      'Gastronomía (Ceviche, lomo saltado, chicha morada)',
    ],
  },
  {
    id: 'buenos-aires',
    ciudad: 'Buenos Aires',
    pais: 'Argentina',
    aeropuerto: 'Aeroparque Jorge Newbery (AEP) / Ezeiza (EZE)',
    zonaHoraria: 'America/Argentina/Buenos_Aires (UTC-3)',
    moneda: 'ARS',
    actividades: [
      'Museos (MALBA, Museo Nacional de Bellas Artes)',
      'Teatro (Av. Corrientes, Teatro Colón)',
      'Gastronomía (Parrillas, empanadas, medialunas)',
    ],
  },
  {
    id: 'rio',
    ciudad: 'Río de Janeiro',
    pais: 'Brasil',
    aeropuerto: 'Aeropuerto Internacional de Galeão (GIG) / Santos Dumont (SDU)',
    zonaHoraria: 'America/Sao_Paulo (UTC-3)',
    moneda: 'BRL',
    actividades: [
      'Playas (Copacabana, Ipanema, Arpoador)',
      'Música (Samba en Lapa, bossa nova)',
      'Naturaleza (Pan de Azúcar, Cristo Redentor, Parque Lage)',
    ],
  },
  {
    id: 'puerto-varas',
    ciudad: 'Puerto Varas',
    pais: 'Chile',
    aeropuerto: 'Aeropuerto El Tepual, Puerto Montt (PMC)',
    zonaHoraria: 'America/Santiago (UTC-3)',
    moneda: 'CLP',
    actividades: [
      'Lagos (Lago Llanquihue, Todos los Santos)',
      'Senderismo (Saltos del Petrohué, Parque Nacional Vicente Pérez Rosales)',
      'Volcanes (Volcán Osorno, Volcán Calbuco)',
    ],
  },
];

const opciones = {
  cusco: {
    vuelos: [
      {
        id: 'cu-v1',
        aerolinea: 'LATAM Airlines',
        numeroVuelo: 'LA2367',
        origen: 'Santiago (SCL)',
        destino: 'Cusco (CUZ)',
        precio: 173720,
        fecha: '2027-03-18',
        escalas: 0,
        duracion: '3 h y 40 min',
        disponibilidad: true,
      },
      {
        id: 'cu-v2',
        aerolinea: 'LATAM Airlines',
        numeroVuelo: 'LA640 / LA2217',
        origen: 'Santiago (SCL)',
        destino: 'Cusco (CUZ)',
        precio: 186446,
        fecha: '2027-03-21',
        escalas: 1,
        escalaEn: 'Lima (LIM)',
        duracion: '7 h y 45 min',
        disponibilidad: true,
      },
    ],
    hoteles: [
      {
        id: 'cu-h1',
        nombre: 'Tikala Cusco Boutique Hotel',
        ubicacion: 'Cusco (C. K\'uichipunku 385)',
        precioNoche: 45794,
        precioEstadia: 183176,
        fechaEntrada: '2027-03-18',
        fechaSalida: '2027-03-22',
        disponibilidad: true,
      },
      {
        id: 'cu-h2',
        nombre: 'Viajero Cusco Hostel',
        ubicacion: 'Centro histórico (San Andrés 260)',
        precioNoche: 30514,
        precioEstadia: 122054,
        fechaEntrada: '2027-03-18',
        fechaSalida: '2027-03-22',
        disponibilidad: true,
      },
    ],
  },
  'buenos-aires': {
    vuelos: [
      {
        id: 'ba-v1',
        aerolinea: 'JetSMART',
        numeroVuelo: 'JA703',
        origen: 'Santiago (SCL)',
        destino: 'Buenos Aires (AEP)',
        precio: 93930,
        fecha: '2027-04-08',
        escalas: 0,
        duracion: '2 h y 07 min',
        disponibilidad: true,
      },
      {
        id: 'ba-v2',
        aerolinea: 'Aerolíneas Argentinas',
        numeroVuelo: 'AR1285',
        origen: 'Santiago (SCL)',
        destino: 'Buenos Aires (AEP)',
        precio: 101000,
        fecha: '2027-04-10',
        escalas: 0,
        duracion: '2 h y 05 min',
        disponibilidad: true,
      },
    ],
    hoteles: [
      {
        id: 'ba-h1',
        nombre: 'Up Recoleta Hotel',
        ubicacion: 'Recoleta / Centro (José León Pagano 2684)',
        precioNoche: 62180,
        precioEstadia: 248719,
        fechaEntrada: '2027-04-08',
        fechaSalida: '2027-04-12',
        disponibilidad: true,
      },
      {
        id: 'ba-h2',
        nombre: 'Pleno Palermo Soho',
        ubicacion: 'Palermo Soho (Gurruchaga 2121)',
        precioNoche: 152207,
        precioEstadia: 608828,
        fechaEntrada: '2027-04-08',
        fechaSalida: '2027-04-12',
        disponibilidad: true,
      },
    ],
  },
  rio: {
    vuelos: [
      {
        id: 'ri-v1',
        aerolinea: 'JetSMART',
        numeroVuelo: 'JA762',
        origen: 'Santiago (SCL)',
        destino: 'Río de Janeiro (GIG)',
        precio: 170690,
        fecha: '2027-05-12',
        escalas: 0,
        duracion: '4 h y 14 min',
        disponibilidad: true,
      },
      {
        id: 'ri-v2',
        aerolinea: 'Aerolíneas Argentinas',
        numeroVuelo: 'AR1287 / AR1260',
        origen: 'Santiago (SCL)',
        destino: 'Río de Janeiro (GIG)',
        precio: 168064,
        fecha: '2027-05-15',
        escalas: 1,
        escalaEn: 'Buenos Aires (AEP)',
        duracion: '11 h y 05 min',
        disponibilidad: true,
      },
    ],
    hoteles: [
      {
        id: 'ri-h1',
        nombre: 'B&B Hotel Rio de Janeiro Copacabana Posto 5',
        ubicacion: 'Copacabana (Av. Nossa Sra. de Copacabana 1256)',
        precioNoche: 71244,
        precioEstadia: 284976,
        fechaEntrada: '2027-05-12',
        fechaSalida: '2027-05-16',
        disponibilidad: true,
      },
      {
        id: 'ri-h2',
        nombre: 'Hotel Bossa Nova Ipanema',
        ubicacion: 'Ipanema / Arpoador (Rua Bulhões Carvalho 337)',
        precioNoche: 63406,
        precioEstadia: 253624,
        fechaEntrada: '2027-05-12',
        fechaSalida: '2027-05-16',
        disponibilidad: true,
      },
    ],
  },
  'puerto-varas': {
    vuelos: [
      {
        id: 'pv-v1',
        aerolinea: 'JetSMART',
        numeroVuelo: 'JA197',
        origen: 'Santiago (SCL)',
        destino: 'Puerto Montt (PMC)',
        precio: 60822,
        fecha: '2027-02-13',
        escalas: 0,
        duracion: '1 h y 46 min',
        disponibilidad: true,
      },
      {
        id: 'pv-v2',
        aerolinea: 'LATAM Airlines',
        numeroVuelo: 'LA257',
        origen: 'Santiago (SCL)',
        destino: 'Puerto Montt (PMC)',
        precio: 66990,
        fecha: '2027-02-15',
        escalas: 0,
        duracion: '1 h y 45 min',
        disponibilidad: true,
      },
    ],
    hoteles: [
      {
        id: 'pv-h1',
        nombre: 'Park Inn by Radisson, Puerto Varas',
        ubicacion: 'Puerto Varas (La Paz 471)',
        precioNoche: 94755,
        precioEstadia: 379022,
        fechaEntrada: '2027-02-13',
        fechaSalida: '2027-02-17',
        disponibilidad: true,
      },
      {
        id: 'pv-h2',
        nombre: 'Hotel Patagonico',
        ubicacion: 'Puerto Varas (Klenner 349)',
        precioNoche: 154288,
        precioEstadia: 617152,
        fechaEntrada: '2027-02-13',
        fechaSalida: '2027-02-17',
        disponibilidad: true,
      },
    ],
  },
};

export const handlers = [
  //GET REST mock para destinos, paises y actividades
  http.get(/\/api\/destinos$/, async () => {
    //latencia simulada permite comprobar carga
    await delay(650);
    return HttpResponse.json(destinos);
  }),

  // Pauta 3: consulta GraphQL mock con la variable id del destino elegido.
  graphql.query('OpcionesViaje', async ({ variables }) => {
    await delay(950);
    const destino = destinos.find((item) => item.id === variables.id);
    const contenido = opciones[variables.id];
    if (!destino || !contenido) {
      return HttpResponse.json({ errors: [{ message: 'No existe información para ese destino.' }] });
    }
    return HttpResponse.json({
      data: { opcionesViaje: { destino, vuelos: contenido.vuelos, hoteles: contenido.hoteles } },
    });
  }),
];
