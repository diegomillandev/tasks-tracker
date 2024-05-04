import { Link } from 'react-router-dom';

export const NoFound = () => {
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">
                404
            </h1>
            <div className="bg-blue-700 px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <button className="mt-5">
                <div className="relative inline-block text-sm font-medium text-blue-600 group active:text-red-500 focus:outline-none focus:ring">
                    <Link to="/" replace>
                        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                            Go Home
                        </span>
                    </Link>
                </div>
            </button>
        </main>
    );
};
