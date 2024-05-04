import { useEffect } from 'react';
import { IconGithub, IconGoogle, Logo } from '../../components';
import useAuthStore from '../../store/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const [userSession, handleSignInGithub, handleSingInGoogle] = useAuthStore(
        (state) => [
            state.userSession,
            state.handleSignInGithub,
            state.handleSingInGoogle,
        ]
    );

    useEffect(() => {
        if (userSession) {
            navigate('/', { replace: true });
        }
    }, [userSession]);

    return (
        <div className="flex flex-col items-center px-6 pb-8 mx-auto pt-40 md:h-screen">
            <div className="mb-6">
                <Logo />
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-col items-center justify-center space-y-5">
                <h1 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <button
                        type="button"
                        className="text-white inline-flex items-center justify-center dark:border dark:border-gray-700 py-2 px-4 rounded-lg hover:bg-gray-700 w-full md:w-auto"
                        onClick={handleSingInGoogle}
                    >
                        <IconGoogle />
                        Sign in with Google
                    </button>
                    <button
                        type="button"
                        className="text-white inline-flex items-center justify-center dark:border dark:border-gray-700 py-2 px-4 rounded-lg hover:bg-gray-700 w-full md:w-auto"
                        onClick={handleSignInGithub}
                    >
                        <IconGithub />
                        Sign in with Github
                    </button>
                </div>
            </div>
        </div>
    );
};
