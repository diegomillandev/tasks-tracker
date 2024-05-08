import { GrAdd } from 'react-icons/gr';
import { LoadingTasks, Task } from '.';
import { useEventStore } from '../store/events';
import { useEffect, useMemo, useState } from 'react';
import useAuthStore from '../store/auth';
import { useQuery } from '@tanstack/react-query';
import { getUserTasks } from '../services/supabse.service';
import { useCalendarStore } from '../store/calendar';
import { TaskEdit } from '../types';
import dayjs from 'dayjs';

export const TasksList = () => {
    const [timeTotal, setTimeTotal] = useState(0);
    const [userSession] = useAuthStore((state) => [state.userSession]);
    const [setShowModal] = useEventStore((state) => [state.setShowModal]);
    const [selectedDate] = useCalendarStore((state) => [state.selectedDate]);

    const userId = userSession?.user?.id;

    const { data, isLoading } = useQuery({
        queryKey: ['tasks', userId],
        queryFn: () => getUserTasks(userId),
    });

    const listTasks = data as TaskEdit[];

    const filterTasks = useMemo(() => {
        return listTasks?.filter((task) => {
            const scheduled_date = dayjs(task.scheduled_date).format(
                'YYYY-MM-DD'
            );
            const selected_date = dayjs(selectedDate).format('YYYY-MM-DD');
            return scheduled_date === selected_date;
        });
    }, [listTasks, selectedDate]);

    useEffect(() => {
        if (filterTasks) {
            const total = filterTasks.reduce(
                (acc, task) => acc + task.timer,
                0
            );
            if (total !== timeTotal) {
                setTimeTotal(total);
            }
        }
    }, [filterTasks, timeTotal]);

    return (
        <div className="mb-10">
            <div className="mb-5 bg-transparent">
                <header className="text-white border border-[#4a5662]  bg-[#1e2a36] font-bold p-3 rounded flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl">Task List</h2>

                    <button
                        onClick={() => setShowModal(true)}
                        className="p-3 bg-[#005ad1] hover:bg-blue-700 rounded font-medium flex items-center gap-x-2 transition-colors"
                    >
                        <GrAdd />
                        Add Task
                    </button>
                </header>

                <div className="flex items-center justify-between">
                    <h3 className="text-white my-4 text-2xl font-bold">
                        To Do&apos;s
                    </h3>
                    <div className="border border-[#4a5662]  bg-[#354250] text-white p-2 flex gap-2 rounded">
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
                {filterTasks?.length > 0 ? (
                    filterTasks?.map((task) => (
                        <Task key={task.id} task={task} />
                    ))
                ) : (
                    <div
                        className="w-4/6 md:w-2/3 lg:w-3/6 md:max-w-56 mx-auto flex items-center p-4 mb-4 text-md text-blue-800 rounded-lg bg-blue-50 dark:bg-[#005ad1] dark:text-white"
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
