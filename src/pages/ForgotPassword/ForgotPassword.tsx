import { PublicRoutes } from '../../models';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButtons, MessageInputsError } from '../../components';
import { consultEmail, forgotPassword } from '../../services/auth.service';
import { useState } from 'react';
import { toast } from 'sonner';

interface ForgotPasswordForm {
    email: string;
}

export const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordForm>();

    const onSubmit = async (data: ForgotPasswordForm) => {
        setLoading(true);

        const result = await consultEmail(data.email);

        if (result.userNotFound) {
            toast.error('Email not found, please try again.');
            setLoading(false);
            return;
        }
        await forgotPassword(data.email);
        setEmailSent(true);
        setLoading(false);
    };
    return (
        <>
            <div className="flex pt-10 md:pt-24 pb-10 md:pb-0 items-center min-h-screen flex-col">
                <div
                    className="bg-gray-800 p-8 w-11/12 max-w-[450px] rounded-md border border-gray-700"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h2 className="text-xl text-center md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        TaskTracker
                        <span className="block text-lg font-extralight">
                            Reset your password
                        </span>
                    </h2>
                    {!emailSent ? (
                        <form autoComplete="off">
                            <div className="mb-8 relative">
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
                                    placeholder="diego.millan@company.com"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
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
                            <button
                                type="submit"
                                className="p-2 bg-[#006de3] text-white hover:bg-blue-700 rounded font-medium flex items-center gap-x-2 transition-colors w-full justify-center"
                            >
                                {loading ? <LoadingButtons /> : 'Send email'}
                            </button>
                            <div className="mt-4 text-gray-400 text-center text-sm">
                                Remember your password?{' '}
                                <Link
                                    to={`/${PublicRoutes.LOGIN}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center">
                            <p className="text-lg text-[#006de3]">
                                We have sent you an email with instructions to
                                reset your password.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
