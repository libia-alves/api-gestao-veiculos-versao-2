import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Foods } from "./pages/Foods";
import { Customers } from "./pages/Customers";
import { Home } from "./pages/Home";


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
                    path="/home"
                    element={(
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    )}
                />

                <Route
                    path="/foods"
                    element={(
                        <PrivateRoute>
                            <Foods />
                        </PrivateRoute>
                    )}
                />


                <Route
                    path="/customers"
                    element={(
                        <PrivateRoute>
                            <Customers />
                        </PrivateRoute>
                    )}
                />

              


            </Routes>
        </BrowserRouter>
    )
}
