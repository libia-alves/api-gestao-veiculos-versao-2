

import { BrowserRouter, Navigate, Route, Routes, Switch } from "react-router-dom";

import { Login } from "./pages/Login";

import { Register } from "./pages/Register";
import { Veiculos } from "./pages/Veiculo"; // Importe a página de veículos
import { Escolas } from "./pages/Escola"; // Importe a página de escolas
import { Horarios } from "./pages/Horario"; // Importe a página de horários
import { Rotas } from "./pages/Rota"; // Importe a página de rotas


import { ProfilePage } from "./pages/ProfilePage";
import  Dashboard  from "./pages/Dashboard";



import { isAuthenticated } from './utils/is-authenticated';


/**
 * Cria rotas autenticadas
 */
export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        // Pode trocar para renderizar uma página customizada de não autorizada,
        // nesse caso ele vai voltar para a tela de login
        return <Navigate to="/" replace />
    }
    return children;
}

export function Navigations() {
    return (
        <BrowserRouter>

            <Routes>
                <Route index path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard"
                    element={(
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    )}
                />

                <Route
                    path="/veiculos"
                    element={(
                        <PrivateRoute>
                            <Veiculos />
                        </PrivateRoute>
                    )}
                />

                <Route
                    path="/escolas"
                    element={(
                        <PrivateRoute>
                            <Escolas />
                        </PrivateRoute>
                    )}
                />

                <Route
                    path="/horarios"
                    element={(
                        <PrivateRoute>
                            <Horarios />
                        </PrivateRoute>
                    )}
                />

                <Route
                    path="/rotas"
                    element={(
                        <PrivateRoute>
                            <Rotas />
                        </PrivateRoute>
                    )}
                />

                <Route
                    path="/profile"
                    element={(
                        <PrivateRoute>
                            <ProfilePage />
                        </PrivateRoute>
                    )}
                />



              


            </Routes>
        </BrowserRouter>
    )
}
