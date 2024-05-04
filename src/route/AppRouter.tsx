import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard, Login } from '../pages';
import { PrivateRoutes, PublicRoutes } from '../models';
import { AuthGuard } from '../guards';
import { Layout } from '../layout';
import { NoFound } from '../pages/404';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate replace to={PrivateRoutes.DASHBOARD} />}
                />
                <Route path={PublicRoutes.LOGIN} element={<Login />} />
                <Route element={<AuthGuard />}>
                    <Route element={<Layout />}>
                        <Route
                            path={PrivateRoutes.DASHBOARD}
                            element={<Dashboard />}
                        />
                    </Route>
                </Route>
                <Route path="*" element={<NoFound />} />
            </Routes>
        </BrowserRouter>
    );
};
