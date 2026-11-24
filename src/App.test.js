import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing/react';
import App from './App';
import { OPCIONES_VIAJE } from './graphql/consultas';

test('permite seleccionar un destino y consultar sus vuelos y hoteles', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [{ id: 'cusco', ciudad: 'Cusco', pais: 'Perú', actividades: ['Historia'] }],
  });
  const mocks = [{
    request: { query: OPCIONES_VIAJE, variables: { id: 'cusco' } },
    result: { data: { opcionesViaje: {
      destino: { id: 'cusco', ciudad: 'Cusco', pais: 'Perú' },
      vuelos: [{ id: 'v1', aerolinea: 'LATAM', origen: 'Santiago', destino: 'Cusco',
        fecha: '2027-03-18', precio: 100000, disponibilidad: true }],
      hoteles: [{ id: 'h1', nombre: 'Hotel Cusco', ubicacion: 'Cusco',
        fechaEntrada: '2027-03-18', fechaSalida: '2027-03-22',
        precioNoche: 30000, disponibilidad: true }],
    } } },
  }];
  render(<MockedProvider mocks={mocks}><MemoryRouter initialEntries={['/']}
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><App /></MemoryRouter></MockedProvider>);

  fireEvent.click(screen.getByRole('link', { name: /ver destinos/i }));
  fireEvent.click(await screen.findByRole('link', { name: /cusco/i }));
  expect(await screen.findByRole('heading', { name: 'LATAM' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Hotel Cusco' })).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith('/api/destinos');
});
