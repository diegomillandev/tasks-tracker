import { supabase } from '../supabase';

export const handleSingIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: 'http://localhost:5173' },
    });
    if (error) {
        console.error('Error: ', error.message);
    }
    return data;
};

export const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error: ', error.message);
    }
};
