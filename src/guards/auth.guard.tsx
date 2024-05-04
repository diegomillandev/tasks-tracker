import { Outlet, useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../models';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import useAuthStore from '../store/auth';
import { Loading } from '../components';

export const AuthGuard = () => {
    const [setUserSession] = useAuthStore((state) => [state.setUserSession]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        supabase.auth
            .getSession()
            .then(({ data }) => {
                if (!data.session?.access_token) navigate(PublicRoutes.LOGIN);
                setUserSession(data.session);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <Loading />;
    return <Outlet />;
};
