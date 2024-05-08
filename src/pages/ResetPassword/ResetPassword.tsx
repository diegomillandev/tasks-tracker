import { PublicRoutes } from '../../models';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButtons, MessageInputsError } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useShowPassword } from '../../hooks';
import { BiHide, BiShow } from 'react-icons/bi';
import { toast } from 'sonner';
import { resetPassword } from '../../services/auth.service';

interface ResetPasswordForm {
    password: string;
    confirm_password: string;
}

export const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const { showPassword, toggleShowPassword } = useShowPassword();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ResetPasswordForm>();

    const onSubmit = async (data: ResetPasswordForm) => {
        setLoading(true);
        const result = await resetPassword(data.password);

        if (!result) {
            toast.error('Error updating password try again later');
            setLoading(false);
            return;
        }
        toast.success('Password updated successfully');
        navigate('/', { replace: true });
        setLoading(false);
        setChangePassword(true);
    };
    return (
        <>
            <div className="flex pt-10 md:pt-24 pb-10 md:pb-0 items-center min-h-screen flex-col">
                <div
                    className="bg-gray-800 p-8 w-11/12 max-w-[450px] rounded-md border border-gray-700"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h2 className="text-4xl text-center md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        TaskTracker
                        <span className="block text-lg font-extralight">
                            Update your password
                        </span>
                    </h2>
                    {changePassword ? (
                        <div>
                            <p className="text-center text-gray-400">
                                Your password has been reset successfully
                            </p>
                            <Link
                                to={`/${PublicRoutes.LOGIN}`}
                                className="p-3 bg-blue-600 text-white hover:bg-blue-700 rounded font-light flex items-center gap-x-2 transition-colors w-full justify-center mt-4"
                            >
                                Login
                            </Link>
                        </div>
                    ) : (
                        <form>
                            <div className="mb-8 relative">
                                <label
                                    htmlFor="password"
                                    className="block mb-0.5 text-sm font-light text-gray-900 dark:text-white"
                                >
                                    New password
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
                                    className="absolute top-1/2 right-1 transform translate-y-.5 cursor-pointer text-gray-500 hover:text-gray-100 transition-colors"
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
                                    Confirm new password
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="confirm_password"
                                    className="w-full p-2 mt-1 bg-gray-700 focus:outline-none focus:ring-2 rounded
                        focus:ring-blue-600 focus:border-transparent text-white placeholder:text-gray-600 disabled:cursor-not-allowed disabled:bg-gray-500"
                                    placeholder="•••••••••"
                                    {...register('confirm_password', {
                                        required:
                                            'Confirm password is required',
                                        validate: (value) =>
                                            value === watch('password') ||
                                            'Passwords do not match',
                                    })}
                                    disabled={loading}
                                />
                                <div
                                    className="absolute top-1/2 right-1 transform translate-y-.5 cursor-pointer text-gray-500 hover:text-gray-100 transition-colors"
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
                                {loading ? (
                                    <LoadingButtons />
                                ) : (
                                    'Update password'
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};
