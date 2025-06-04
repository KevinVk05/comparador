import Comparador from './componentes/comparadores/comparador'
import Comparador2 from './componentes/comparadores/comparador2'

import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './Login/AuthProvider';
import Login from './Login/login';
import RutasProtegidas from './Login/RutasProtegidas';
import CestaCompra from './componentes/cesta/cestaCompra';
import AdministrarListas from './componentes/admin/administrarListas/administrarListas';
import MenuSuperior from './componentes/comunes/menu';
import Pagina404 from './componentes/comunes/Pagina404';
import RutasAdminProtegida from './Login/RutasAdminProtegidas';
import ComparadorAdmin from './componentes/admin/comparadorProductosAdmin.jsx/comparadorAdmin';
import BotonScroll from './componentes/comunes/botonScroll';


function App() {

  return (

    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <MenuSuperior />
        </header>
        <main className='pt-5'>

          <Routes>
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/"
              element={
                <RutasProtegidas>
                  <Comparador />
                  <BotonScroll />
                </RutasProtegidas>
              }
            />

            <Route
              path="/administrarListas"
              element={
                <RutasAdminProtegida>
                  <AdministrarListas />
                  <BotonScroll />
                </RutasAdminProtegida>
              }
            />

            <Route
              path="/comparadorAdmin/:nombreLista"
              element={
                <RutasAdminProtegida>
                  <ComparadorAdmin />
                  <BotonScroll />
                </RutasAdminProtegida>
              }
            />

            <Route path="/comparador2" element={
              <RutasProtegidas>
                <Comparador2 />
                <BotonScroll />
              </RutasProtegidas>
            } />

            <Route path="/cestaCompra" element={
              <RutasProtegidas>
                <CestaCompra />
                <BotonScroll />
              </RutasProtegidas>
            } />

            <Route path="*" element={<Pagina404 />} />

          </Routes>
        </main>
      </div>
    </AuthProvider>

  );
}

export default App