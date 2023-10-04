import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Horarios } from './pages/Horario';
import { useState } from 'react';
import { Veiculos } from './pages/Veiculo';
import { Rotas } from './pages/Rota';
import { Escolas } from './pages/Escola';
import { Register } from './pages/Register';
import { Navigations, PrivateRoute } from './routes';
import { isAuthenticated } from './utils/is-authenticated';
import   Dashboard  from './pages/Dashboard';
import { ProfilePage } from './pages/ProfilePage';
import { Sidebar } from './components/Sidebar';

export default function App() {
  const [expanded, setExpanded] = useState(true);

  return (
    <BrowserRouter>
<div className={`min-height ${expanded ? 'expanded' : ''}`}>

        <Routes>
      

          <Route index path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <>
                
                </>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/veiculos"
            element={
              <PrivateRoute>
                { <Sidebar expanded={expanded} setExpanded={setExpanded} />}
                <Veiculos />
              </PrivateRoute>
            }
          />
          <Route
            path="/escolas"
            element={
              <PrivateRoute>
                {<Sidebar expanded={expanded} setExpanded={setExpanded} />}
                <Escolas />
              </PrivateRoute>
            }
          />
          <Route
            path="/horarios"
            element={
              <PrivateRoute>
                { <Sidebar expanded={expanded} setExpanded={setExpanded} />}
                <Horarios />
              </PrivateRoute>
            }
          />
          <Route
            path="/rotas"
            element={
              <PrivateRoute>
                { <Sidebar expanded={expanded} setExpanded={setExpanded} />}
                <Rotas />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                { <Sidebar expanded={expanded} setExpanded={setExpanded} />}
                <ProfilePage />
              </PrivateRoute>
            }
          />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}
