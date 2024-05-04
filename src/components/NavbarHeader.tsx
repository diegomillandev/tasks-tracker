import { BiTask } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth';

export const NavbarHeader = () => {
    const navigate = useNavigate();
    const [userSession, handleLogout] = useAuthStore((state) => [
        state.userSession,
        state.handleLogout,
    ]);

    const handleLogoutUser = async () => {
        await handleLogout();
        navigate('/login', { replace: true });
    };

    const user = userSession?.user.user_metadata;
    return (
        <div className="bg-[#1e2a36] text-white flex py-2 justify-between px-3 sticky top-0 z-50 border-b border-gray-700">
            <div className="flex items-center select-none">
                <BiTask className="text-4xl" />
                <h1 className="text-3xl">Tasks</h1>
            </div>

            <div className="relative group cursor-pointer p-2">
                <div className="flex gap-x-2">
                    <div className="w-10 h-10 font-extralight bg-gray-900 rounded-full flex justify-center items-center">
                        <img
                            src={`${user?.avatar_url}`}
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm capitalize">{`${user?.full_name}`}</p>
                        <p className="text-xs text-zinc-400">
                            {`${user?.email}`}
                        </p>
                    </div>
                </div>

                <div
                    className="absolute z-10 font-normal rounded shadow w-[15rem] bg-gray-700 divide-gray-600 top-[95%]
                right-2 hidden group-hover:block overflow-hidden"
                >
                    <div className="flex flex-col px-4 py-2 md:hidden">
                        <p className="text-sm capitalize">{`${user?.full_name}`}</p>
                        <p className="text-xs text-zinc-500">
                            {`${user?.email}`}
                        </p>
                    </div>
                    <ul className="text-sm text-gray-700 dark:text-gray-400 ">
                        <li>
                            <Link
                                to={'/'}
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Tasks
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={'/user/edit-profile'}
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Profile
                            </Link>
                        </li>
                    </ul>
                    <hr className="bg-gray-700" />
                    <div className="">
                        <button
                            className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white w-full text-left"
                            onClick={handleLogoutUser}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};