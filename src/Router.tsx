import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy } from 'react';

//Importamos las paginas de nuestra aplicación de forma lazy para mejorar el rendimiento
const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const Menu = lazy(() => import('./pages/Menu/Menu'));
//Creamos el router de nuestra aplicación
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/menu" element={<Menu />} />
            </Routes>
        </BrowserRouter>
    );
};
export default AppRouter;
