import { Link } from 'react-router-dom';
import { PublicRoutes } from '../../models';
import { BiHide, BiShow, BiTask } from 'react-icons/bi';
import { useShowPassword } from '../../hooks';
import { useForm } from 'react-hook-form';
import { MessageInputsError } from '../../components';
import { RegisterFrom } from '../../types';
import { signUpNewUser } from '../../services/auth.service';

export const SignUp = () => {
    const { showPassword, toggleShowPassword } = useShowPassword();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFrom>();

    const registerNewUser = (data: RegisterFrom) => {
        signUpNewUser(data);
    };
    return (
        <div className="flex pt-10 md:pt-24 pb-10 md:pb-0 items-center min-h-screen flex-col">
            <div className="flex items-center select-none mb-5 md:mb-10">
                <BiTask className="text-4xl md:text-5xl" />
                <h1 className="text-3xl md:text-5xl font-medium">
                    TaskTracker
                </h1>
            </div>
            <form
                className="bg-gray-800 p-6 w-11/12 max-w-[450px] rounded-md border border-gray-700"
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit(registerNewUser)}
            >
                <h2 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-6">
                    Create and account
                </h2>
                <div className="grid gap-6 mb-6 md:grid-cols-2 relative">
                    <div>
                        <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            First name
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            className="w-full p-2 mt-1 bg-gray-700 focus:outline-none focus:ring-2 rounded
                            focus:ring-blue-600 focus:border-transparent text-white placeholder:text-gray-600"
                            placeholder="John"
                            {...register('first_name', {
                                required: 'First name is required',
                            })}
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
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Last name
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            className="w-full p-2 mt-1 bg-gray-700 focus:outline-none focus:ring-2 rounded
                        focus:ring-blue-600 focus:border-transparent text-white placeholder:text-gray-600"
                            placeholder="Doe"
                            {...register('last_name', {
                                required: 'Last name is required',
                            })}
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
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 mt-1 bg-gray-700 focus:outline-none focus:ring-2 rounded
                        focus:ring-blue-600 focus:border-transparent text-white placeholder:text-gray-600"
                        placeholder="john.doe@company.com"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
                <div className="mb-8 relative">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                                    'Password must be at least 8 characters',
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
                <div className="mb-8 relative">
                    <label
                        htmlFor="confirm_password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Confirm Password
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirm_password"
                        className="w-full p-2 mt-1 bg-gray-700 focus:outline-none focus:ring-2 rounded
                        focus:ring-blue-600 focus:border-transparent text-white placeholder:text-gray-600"
                        placeholder="•••••••••"
                        {...register('confirm_password', {
                            required: 'Confirm password is required',
                            validate: (value) =>
                                value === watch('password') ||
                                'Passwords do not match',
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
                    {errors.confirm_password && (
                        <MessageInputsError>
                            {errors.confirm_password.message}
                        </MessageInputsError>
                    )}
                </div>
                <button
                    type="submit"
                    className="p-3 bg-blue-600 text-white hover:bg-blue-700 rounded font-medium flex items-center gap-x-2 transition-colors w-full justify-center"
                >
                    Sign Up
                </button>

                <p className="text-gray-400 mt-6">
                    Already have an account?{' '}
                    <Link
                        to={`/${PublicRoutes.LOGIN}`}
                        className="text-blue-600 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
};
