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

export const signUpNewUser = async (form: RegisterFrom) => {
    const { email, password, first_name, last_name } = form;
    const { data, error } = await supabase.auth.signUp({
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
        console.error('Error: ', error.message);
    }
    return data;
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

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.error('Error: ', error.message);
    }
  }
