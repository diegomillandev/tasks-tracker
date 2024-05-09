import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth';
import { signOut } from '../services/auth.service';
import { UserInfo } from '../types';
import { BiTask } from 'react-icons/bi';

export const NavbarHeader = () => {
    const [userSession] = useAuthStore((state) => [state.userSession]);
    const navigate = useNavigate();

    const handleLogoutUser = async () => {
        await signOut();
        navigate('/login', { replace: true });
    };

    const user: UserInfo = userSession?.user.user_metadata as UserInfo;
    return (
        <div className="bg-[#1e2a36] text-white flex py-2 justify-between px-6 sticky top-0 z-50 border-b border-gray-700">
            <div className="flex items-center select-none">
                <BiTask className="text-4xl text-gray-200" />
                <h1 className="text-3xl font-medium">TaskTracker</h1>
            </div>

            <div className="relative group cursor-pointer p-2">
                <div className="flex gap-x-2">
                    <div className="w-10 h-10 font-extralight border border-gray-700 bg-gray-900 rounded-full flex justify-center items-center">
                        <img
                            src={`/icon_user.svg`}
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm capitalize">{`${user?.first_name} ${user?.last_name}`}</p>
                        <p className="text-xs text-zinc-400">
                            {`${user?.email}`}
                        </p>
                    </div>
                </div>

                <div
                    className="absolute z-10 font-normal rounded shadow w-[12rem] bg-gray-700 divide-gray-600 top-[95%]
                right-2 hidden group-hover:block overflow-hidden"
                >
                    <div className="flex flex-col px-4 py-2 md:hidden">
                        <p className="text-sm capitalize">{`${user?.first_name} ${user?.last_name}`}</p>
                        <p className="text-xs text-zinc-500">
                            {`${user?.email}`}
                        </p>
                    </div>
                    <ul className="text-sm text-gray-700 dark:text-gray-400 ">
                        <li>
                            <Link
                                to={'/'}
                                className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white w-full text-left"
                            >
                                Tasks
                            </Link>
                        </li>
                    </ul>

                    <ul className="text-sm text-gray-700 dark:text-gray-400 group">
                        <li>
                            <div className="block px-4 py-2 text-sm  text-gray-200 hover:text-white w-full text-left cursor-not-allowed">
                                Profile
                                <span className="text-xs text-gray-600 group-hover:text-gray-400 ps-1">
                                    soon
                                </span>
                            </div>
                        </li>
                    </ul>

                    <div className="">
                        <button
                            className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white w-full text-left"
                            onClick={handleLogoutUser}
                        >
                            Logout
                        </button>
                    </div>
                    <hr className="bg-gray-700" />
                    <footer className="block px-4 py-2 text-xs text-gray-500 text-center ">
                        <p>TaskTracker 0.0.2</p>
                        <Link
                            to={'https://github.com/diegomillandev'}
                            target="_blank"
                        >
                            <p>Developed by Diego Millan</p>
                        </Link>
                    </footer>
                </div>
            </div>
        </div>
    );
};
