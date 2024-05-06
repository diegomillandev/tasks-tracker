import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard, Login, NoFound, SignUp } from '../pages';
import { PrivateRoutes, PublicRoutes } from '../models';
import { AuthGuard } from '../guards';
import { Layout } from '../layout';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate replace to={PrivateRoutes.DASHBOARD} />}
                />
                <Route path={PublicRoutes.LOGIN} element={<Login />} />
                <Route path={PublicRoutes.SIGNUP} element={<SignUp />} />
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
