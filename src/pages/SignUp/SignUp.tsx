import { Link, useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../models';
import { BiHide, BiShow } from 'react-icons/bi';
import { useShowPassword } from '../../hooks';
import { useForm } from 'react-hook-form';
import { LoadingButtons, MessageInputsError } from '../../components';
import { RegisterFrom } from '../../types';
import { consultEmail, signUpNewUser } from '../../services/auth.service';
import { useState } from 'react';
import { toast } from 'sonner';

export const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const { showPassword, toggleShowPassword } = useShowPassword();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFrom>();

    const registerNewUser = async (data: RegisterFrom) => {
        setLoading(true);

        const emailExist = await consultEmail(data.email);

        if (emailExist.userNotFound) {
            toast.error('Email not found, please try again.');
            setLoading(false);
            return;
        }
        const result = await signUpNewUser(data);
        if (result) {
            toast.success('Account created successfully');
            navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
            return;
        }
        toast.error('Error creating account');
        setLoading(false);
    };
    return (
        <div className="flex pt-10 md:pt-24 pb-10 md:pb-0 items-center min-h-screen flex-col">
            <div className="bg-gray-800 p-8 w-11/12 max-w-[450px] rounded-md border border-gray-700">
                <h2 className="text-4xl text-center md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    TaskTracker
                    <span className="block text-lg font-extralight">
                        Create an account
                    </span>
                </h2>
                <form
                    autoComplete="off"
                    onSubmit={handleSubmit(registerNewUser)}
                >
                    <div className="grid gap-6 mb-6 md:grid-cols-2 relative">
                        <div>
                            <label
                                htmlFor="first_name"
                                className="block mb-0.5 text-sm font-light text-white "
                            >
                                First name
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                className="w-full p-2 mt-1 bg-gray-700 focus:outline-none focus:ring-2 rounded
                            focus:ring-blue-600 focus:border-transparent text-gray-100 placeholder:text-gray-600 placeholder:font-extralight
                                disabled:cursor-not-allowed disabled:bg-gray-500"
                                placeholder="Diego"
                                {...register('first_name', {
                                    required: 'First name is required',
                                })}
                                disabled={loading}
                            />
                            {errors.first_name && (
                                <MessageInputsError>
                                    First name is required
                                </MessageInputsError>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="last_name"
                                className="block mb-0.5 text-sm font-light text-gray-900 dark:text-white"
                            >
                                Last name
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                className="w-full p-2 mt-1 bg-gray-700 focus:outline-none focus:ring-2 rounded
                        focus:ring-blue-600 focus:border-transparent text-white placeholder:text-gray-600 placeholder:font-extralight disabled:cursor-not-allowed disabled:bg-gray-500"
                                placeholder="Millan"
                                {...register('last_name', {
                                    required: 'Last name is required',
                                })}
                                disabled={loading}
                            />
                            {errors.last_name && (
                                <MessageInputsError>
                                    {errors.last_name.message}
                                </MessageInputsError>
                            )}
                        </div>
                    </div>
                    <div className="mb-6 relative">
                        <label
                            htmlFor="email"
                            className="block mb-0.5 text-sm font-light text-gray-900 dark:text-white"
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 mt-1 bg-gray-700 focus:outline-none focus:ring-2 rounded
                        focus:ring-blue-600 focus:border-transparent text-white placeholder:text-gray-600 placeholder:font-extralight disabled:cursor-not-allowed disabled:bg-gray-500"
                            placeholder="millandev@company.com"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            disabled={loading}
                        />
                        {errors.email && (
                            <MessageInputsError>
                                {errors.email.message}
                            </MessageInputsError>
                        )}
                    </div>
                    <div className="mb-8 relative">
                        <label
                            htmlFor="password"
                            className="block mb-0.5 text-sm font-light text-gray-900 dark:text-white"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="w-full p-2 mt-1 bg-gray-700 focus:outline-none focus:ring-2 rounded
                        focus:ring-blue-600 focus:border-transparent text-white placeholder:text-gray-600 disabled:cursor-not-allowed disabled:bg-gray-500"
                            placeholder="•••••••••"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message:
                                        'Password must be at least 8 characters',
                                },
                            })}
                            disabled={loading}
                        />
                        <div
                            className="absolute top-1/2 right-1 transform translate-y-1 cursor-pointer text-gray-500 hover:text-gray-100 transition-colors"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? (
                                <BiHide
                                    className={`text-2xl ${
                                        loading ? 'hidden' : ''
                                    }`}
                                />
                            ) : (
                                <BiShow
                                    className={`text-2xl ${
                                        loading ? 'hidden' : ''
                                    }`}
                                />
                            )}
                        </div>
                        {errors.password && (
                            <MessageInputsError>
                                {errors.password.message}
                            </MessageInputsError>
                        )}
                    </div>
                    <div className="mb-8 relative">
                        <label
                            htmlFor="confirm_password"
                            className="block mb-0.5 text-sm font-light text-gray-900 dark:text-white"
                        >
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="confirm_password"
                            className="w-full p-2 mt-1 bg-gray-700 focus:outline-none focus:ring-2 rounded
                        focus:ring-blue-600 focus:border-transparent text-white placeholder:text-gray-600 disabled:cursor-not-allowed disabled:bg-gray-500"
                            placeholder="•••••••••"
                            {...register('confirm_password', {
                                required: 'Confirm password is required',
                                validate: (value) =>
                                    value === watch('password') ||
                                    'Passwords do not match',
                            })}
                            disabled={loading}
                        />
                        <div
                            className="absolute top-1/2 right-1 transform translate-y-1 cursor-pointer text-gray-500 hover:text-gray-100 transition-colors"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? (
                                <BiHide
                                    className={`text-2xl ${
                                        loading ? 'hidden' : ''
                                    }`}
                                />
                            ) : (
                                <BiShow
                                    className={`text-2xl ${
                                        loading ? 'hidden' : ''
                                    }`}
                                />
                            )}
                        </div>
                        {errors.confirm_password && (
                            <MessageInputsError>
                                {errors.confirm_password.message}
                            </MessageInputsError>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="p-3 bg-blue-600 text-white hover:bg-blue-70.5mb-0.5 rounded font-light flex items-center gap-x-2 transition-colors w-full justify-center"
                    >
                        {loading ? <LoadingButtons /> : 'Sign up'}
                    </button>
                </form>

                <p className="text-gray-400 mt-6 text-sm">
                    Already have an account?{' '}
                    <Link
                        to={`/${PublicRoutes.LOGIN}`}
                        className="text-blue-600 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};
