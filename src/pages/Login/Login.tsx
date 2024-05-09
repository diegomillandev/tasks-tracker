import { BiHide, BiShow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../models';
import { useShowPassword } from '../../hooks';
import { useForm } from 'react-hook-form';
import { MessageInputsError } from '../../components';
import { LoginFrom } from '../../types';
import { signInUser } from '../../services/auth.service';
import { supabase } from '../../supabase';
import { toast } from 'sonner';

export const Login = () => {
    const { showPassword, toggleShowPassword } = useShowPassword();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFrom>();

    const onSubmit = async (data: LoginFrom) => {
        await signInUser(data);
        try {
            const {
                data: { session: token },
            } = await supabase.auth.getSession();
            if (token) {
                navigate('/', { replace: true });
            }
        } catch (error) {
            toast.error('Error signing in, try again later');
        }
    };

    return (
        <div className="flex pt-10 md:pt-24 pb-10 md:pb-0 items-center min-h-screen flex-col">
            <form
                className="bg-gray-800 p-8 w-11/12 max-w-[450px] rounded-md border border-gray-700"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="text-4xl text-center md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    TaskTracker
                    <span className="block text-lg font-extralight">
                        Sign in
                    </span>
                </h2>
                <div className="mb-6 relative">
                    <label
                        htmlFor="email"
                        className="block mb-1 text-sm font-normal text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 mt-1 bg-gray-700 focus:outline-none focus:ring-2 rounded
                        focus:ring-blue-600 focus:border-transparent text-white 
                        placeholder:font-extralight  placeholder:text-gray-600
                        "
                        placeholder="millandev@company.com"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: 'Invalid email address',
                            },
                        })}
                    />
                    {errors.email && (
                        <MessageInputsError>
                            {errors.email.message}
                        </MessageInputsError>
                    )}
                </div>
                <div className="mb-4 relative">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-normal text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className="w-full p-2 mt-1 bg-gray-700 focus:outline-none focus:ring-2 rounded
                        focus:ring-blue-600 focus:border-transparent text-white placeholder:text-gray-600"
                        placeholder="•••••••••"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message:
                                    'Password must be at least 6 characters',
                            },
                        })}
                    />
                    <div
                        className="absolute top-1/2 right-1 transform translate-y-1 cursor-pointer text-gray-500 hover:text-gray-100 transition-colors"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? (
                            <BiHide className="text-2xl" />
                        ) : (
                            <BiShow className="text-2xl" />
                        )}
                    </div>
                    {errors.password && (
                        <MessageInputsError>
                            {errors.password.message}
                        </MessageInputsError>
                    )}
                </div>

                <p className="text-gray-400 mb-4 text-right">
                    <Link
                        to={`/${PublicRoutes.FORGOT_PASSWORD}`}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Forgot password?
                    </Link>
                </p>
                <button
                    type="submit"
                    className="p-2 bg-[#006de3] text-white hover:bg-blue-700 rounded font-medium flex items-center gap-x-2 transition-colors w-full justify-center"
                >
                    Sign in
                </button>

                <p className="text-gray-400 mt-6 text-sm">
                    Don't have an account?{' '}
                    <Link
                        to={`/${PublicRoutes.SIGNUP}`}
                        className="text-blue-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
};
