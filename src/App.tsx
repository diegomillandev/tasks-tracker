import { useEffect } from 'react';
import { AppRouter } from './route';
import { supabase } from './supabase';
import useAuthStore from './store/auth';

export const App = () => {
    const setUserSession = useAuthStore((state) => state.setUserSession);

    useEffect(() => {
        const fetchUserSession = async () => {
            try {
                const { data } = await supabase.auth.getSession();
                setUserSession(data.session);
            } catch (error) {
                console.error('Error fetching user session:', error);
            }
        };
        fetchUserSession();
    }, [setUserSession]);

    return <AppRouter />;
};
