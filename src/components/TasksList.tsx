import { GrAdd } from 'react-icons/gr';
import { Task } from '.';
import { useEventStore } from '../store/events';
import { useTaskStore } from '../store/tasks';
import { useEffect, useState } from 'react';
import useAuthStore from '../store/auth';

export const TasksList = () => {
    const [timeTotal, setTimeTotal] = useState(0);
    const [userSession] = useAuthStore((state) => [state.userSession]);
    const [setShowModal] = useEventStore((state) => [state.setShowModal]);
    const [getTasksById, TaskList] = useTaskStore((state) => [
        state.getTasksById,
        state.TaskList,
    ]);

    useEffect(() => {
        getTasksById(userSession?.user?.id || '');
    }, []);

    useEffect(() => {
        const time = TaskList.reduce((acc, task) => {
            return acc + task.timer;
        }, 0);
        setTimeTotal(time);
    }, []);

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
                {TaskList.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
};
