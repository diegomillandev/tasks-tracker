import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { GrMore } from 'react-icons/gr';
import { TaskEdit } from '../types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask, updateTaskTimer } from '../services/supabse.service';
import { useTaskStore } from '../store/tasks';
import { useEventStore } from '../store/events';

export const Task = ({ task }: { task: TaskEdit }) => {
    const [setShowModal] = useEventStore((state) => [state.setShowModal]);
    const [setEditTask] = useTaskStore((state) => [state.setEditTask]);
    const [isRunning, setIsRunning] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        setTimer(task.timer);
    }, [task]);

    useEffect(() => {
        let interval: number | undefined;
        if (isRunning) {
            interval = window.setInterval(() => {
                setTimer((prevTime) => prevTime + 10);
            }, 10);
        } else {
            if (interval !== undefined) {
                clearInterval(interval);
            }
        }
        return () => {
            if (interval !== undefined) {
                clearInterval(interval);
            }
        };
    }, [isRunning]);

    const queryClient = useQueryClient();
    const mutationDelete = useMutation({
        mutationFn: deleteTask,
        onError: () => {},
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const mutationTimer = useMutation({
        mutationFn: updateTaskTimer,
        onError: () => {},
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const handleDelete = () => {
        mutationDelete.mutate(+task.id);
    };

    const handleEdit = () => {
        setEditTask(task);
        setShowModal(true);
    };

    const handleTimer = () => {
        setIsRunning((prev) => !prev);
        if (!isRunning) return;
        mutationTimer.mutate({
            id: +task.id,
            timer: timer,
            user_id: task.user_id,
        });
    };

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isRunning) {
                e.preventDefault();
                return 'Are you sure you want to leave?';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isRunning]);
    return (
        <li className="border relative rounded shadow bg-gray-800 border-gray-700 p-4">
            <header>
                <p className="text-white text-xl font-normal capitalize">
                    {task.title}
                </p>
                <div className="absolute right-6 top-4 cursor-pointer group">
                    <GrMore className="text-2xl text-gray-200" />
                    <div className="absolute hidden group-hover:block right-0 w-36">
                        <ul className="border top-0 shadow bg-gray-800 border-gray-700 p-2 rounded">
                            <li
                                className="text-gray-200 font-extralight hover:bg-slate-600 p-1 rounded flex items-center gap-3 ps-2"
                                onClick={handleEdit}
                            >
                                <FaEdit className="text-xl" />
                                Edit
                            </li>
                            <li
                                className="text-gray-200 font-extralight hover:bg-slate-600 p-1 rounded flex items-center gap-3 ps-2"
                                onClick={handleDelete}
                            >
                                <FaTrash className="text-xl" />
                                Delete
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <p className="text-gray-500 font-light mt-4">{task.description}</p>
            <div className="mt-3 flex items-center justify-between">
                <p className="text-gray-400">
                    <span>
                        {('0' + Math.floor((timer / 3600000) % 24)).slice(-2)}
                    </span>
                    :
                    <span>
                        {('0' + Math.floor((timer / 60000) % 60)).slice(-2)}
                    </span>
                    :
                    <span>
                        {('0' + Math.floor((timer / 1000) % 60)).slice(-2)}
                    </span>
                    :
                    <span className="text-xs">
                        {('0' + Math.floor((timer / 10) % 100)).slice(-2)}
                    </span>
                </p>
                <div className="flex gap-3">
                    <button
                        className={`${
                            isRunning
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-blue-600 hover:bg-blue-700'
                        } rounded font-medium flex items-center gap-x-2 transition-colors px-3 py-1 text-white`}
                        onClick={handleTimer}
                    >
                        {isRunning ? 'Stop' : 'Start'}
                    </button>
                </div>
            </div>
        </li>
    );
};
