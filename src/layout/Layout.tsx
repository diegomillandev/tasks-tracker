import { Outlet } from 'react-router-dom';
import { NavbarHeader } from '../components/NavbarHeader';

export const Layout = () => {
    return (
        <>
            <NavbarHeader />
            <Outlet />
        </>
    );
};
