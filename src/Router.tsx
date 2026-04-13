
import { HashRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

// Importamos las páginas de forma lazy para mejorar el rendimiento
const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const Menu = lazy(() => import('./pages/Menu/Menu'));
const Proyectos = lazy(() => import('./pages/Proyectos/Proyectos'));

// Creamos el router de nuestra aplicación usando HashRouter
const AppRouter = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/proyectos" element={<Proyectos />} />
            </Routes>
        </HashRouter>
    );
};

export default AppRouter;
