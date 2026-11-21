import { NavLink, Route, Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Destinos from './pages/Destinos';
import DetalleDestino from './pages/DetalleDestino';

export default function App() {
  return (
    <div className="app">
      <header className="cabecera">
        <div className="contenedor cabecera-interior">
          <NavLink className="marca" to="/">viajes.</NavLink>
          <nav className="menu" aria-label="Navegación principal">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/destinos">Destinos</NavLink>
          </nav>
        </div>
      </header>

      <main className="contenedor contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/destinos/:id" element={<DetalleDestino />} />
          <Route
            path="*"
            element={
              <section>
                <h1>Página no encontrada</h1>
                <p>Usa el menú para volver a un destino.</p>
              </section>
            }
          />
        </Routes>
      </main>

      <footer className="pie">
        <div className="contenedor">Frontend-II· Información y precios reales via Google</div>
      </footer>
    </div>
  );
}
