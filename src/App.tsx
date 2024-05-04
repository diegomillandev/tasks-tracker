import { useEffect } from 'react';
import { AppRouter } from './route';
import { supabase } from './supabase';
import useAuthStore from './store/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const App = () => {
    const setUserSession = useAuthStore((state) => state.setUserSession);
    const queryClient = new QueryClient();
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
    return (
        <QueryClientProvider client={queryClient}>
            <AppRouter />
        </QueryClientProvider>
    );
};
