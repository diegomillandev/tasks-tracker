import { supabase } from '../supabase';
import { LoginFrom, RegisterFrom } from '../types';

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

export const consultEmail = async (email: string) => {
    try {
        const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return { userNotFound: true };
            } else {
                throw error;
            }
        }

        return data;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
}

export const signUpNewUser = async (form: RegisterFrom) => {
    const { email, password, first_name, last_name } = form;
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name,
                last_name,
            },
        },
    });
    if (error) {
        return false;
    }
    return true;
}

export const signInUser = async (form: LoginFrom) => {
    const { email, password } = form;
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        console.error('Error: ', error.message);
    }
    console.log(data);
}

export const forgotPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email,  {
        redirectTo: 'http://localhost:5173/reset-password',
    });
    if (error) {
        return error.message;
    }
}

export const resetPassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
        return false;
    }  
    return true;
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.error('Error: ', error.message);
    }
}

// axios instance
