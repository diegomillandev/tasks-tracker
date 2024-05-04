import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabase';

interface AuthStore {
    userSession: Session | null;
    setUserSession: (userProfile: Session | null) => void;
    handleSignInGithub: () => void;
    handleSingInGoogle: () => void;
    handleLogout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    userSession: null,
    setUserSession: (userProfile: Session | null) => {
        set({ userSession: userProfile });
    },
    handleSignInGithub: async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: { redirectTo: 'https://tasks-tracker-millandev.netlify.app' },
            });
            if (error) {
                throw new Error(
                    'An error occurred while trying to sign in with Github'
                );
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    },
    handleSingInGoogle: async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: 'https://tasks-tracker-millandev.netlify.app' },
            });
            if (error) {
                throw new Error(
                    'An error occurred while trying to sign in with Google'
                );
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    },
    handleLogout: async () => {
        await supabase.auth.signOut();
        set({ userSession: null });
    },
}));

export default useAuthStore;
