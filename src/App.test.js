import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

//prueba automatizada
test('muestra el inicio y el enlace a destinos', () => {
  render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: /elige tu próximo destino/i })).not.toBeNull();
  expect(screen.getByRole('link', { name: /ver destinos/i })).not.toBeNull();
});
