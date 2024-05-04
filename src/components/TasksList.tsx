import { GrAdd } from 'react-icons/gr';
import { LoadingTasks, Task } from '.';
import { useEventStore } from '../store/events';
import { useEffect, useState } from 'react';
import useAuthStore from '../store/auth';
import { useQuery } from '@tanstack/react-query';
import { getUserTasks } from '../services/supabse.service';

export const TasksList = () => {
    const [timeTotal, setTimeTotal] = useState(0);
    const [userSession] = useAuthStore((state) => [state.userSession]);
    const [setShowModal] = useEventStore((state) => [state.setShowModal]);

    const userId = userSession?.user?.id;

    const { data, isLoading } = useQuery({
        queryKey: ['tasks', userId],
        queryFn: () => getUserTasks(userId),
    });

    useEffect(() => {
        if (data) {
            const total = data.reduce((acc, task) => {
                return acc + task.timer;
            }, 0);
            setTimeTotal(total);
        }
    }, [data]);

    return (
        <div className="mb-10">
            <div className="mb-5 bg-gray-900">
                <header className="text-white  font-bold bg-[#1e2a36] p-3 rounded flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl">Task List</h2>

                    <button
                        onClick={() => setShowModal(true)}
                        className="p-3 bg-blue-600 hover:bg-blue-700 rounded font-medium flex items-center gap-x-2 transition-colors"
                    >
                        <GrAdd />
                        Add Task
                    </button>
                </header>

                <div className="flex items-center justify-between">
                    <h3 className="text-white my-4 text-2xl font-bold">
                        To Do&apos;s
                    </h3>
                    <div className="bg-[#1e2a36] text-white p-2 flex gap-2 rounded">
                        <p>Total time:</p>
                        <p className="text-gray-400">
                            <span>
                                {(
                                    '0' + Math.floor((timeTotal / 3600000) % 24)
                                ).slice(-2)}
                            </span>
                            :
                            <span>
                                {(
                                    '0' + Math.floor((timeTotal / 60000) % 60)
                                ).slice(-2)}
                            </span>
                            :
                            <span>
                                {(
                                    '0' + Math.floor((timeTotal / 1000) % 60)
                                ).slice(-2)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <ul className="space-y-2 h-[620px] overflow-y-auto no-scrollbar">
                {isLoading && <LoadingTasks />}
                {data?.length !== 0 ? (
                    data?.map((task) => {
                        return <Task key={task.id} task={task} />;
                    })
                ) : (
                    <div
                        className="w-1/2 mx-auto flex items-center p-4 mb-4 text-md text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                        role="alert"
                    >
                        <svg
                            className="flex-shrink-0 inline w-4 h-4 me-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">Info!</span> No tasks
                            found.
                        </div>
                    </div>
                )}
            </ul>
        </div>
    );
};
