import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import App from './App';
import './App.css';

const base = (process.env.PUBLIC_URL || '').replace(/\/$/, '');

// Apollo Client comunica react con API graphQL mock 
const client = new ApolloClient({
  link: new HttpLink({ uri: `${base}/graphql` }),
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById('root'));

async function iniciar() {
  try {
    //MSW intercepta REST y GraphQL antes de usar React
    const { worker } = await import('./mocks/browser');
    await worker.start({
      serviceWorker: { url: `${base}/mockServiceWorker.js` },
      onUnhandledRequest: 'bypass',
      quiet: true,
    });
  } catch (error) {
    root.render(
      <main className="contenedor error-inicio" role="alert">
        <h1>No se pudo iniciar la API simulada</h1>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </main>
    );
    return;
  }

  //hashrouter evita problemas de rutas al actualizar.
  const Router = process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter;
  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
    </React.StrictMode>
  );
}

iniciar();
