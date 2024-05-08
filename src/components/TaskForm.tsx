import { useEffect, useState } from 'react';
import { GrAdd, GrUpdate } from 'react-icons/gr';
import { IoCloseSharp } from 'react-icons/io5';
import { useEventStore } from '../store/events';
import useAuthStore from '../store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, updateTask } from '../services/supabse.service';
import { useTaskStore } from '../store/tasks';
import { TaskEdit } from '../types';
import dayjs from 'dayjs';
import { toast } from 'sonner';

interface NewTask {
    title: string;
    description: string;
    timer: number;
    done: boolean;
    user_id?: string;
    scheduled_date?: string;
}

const intialTaskState = {
    title: '',
    description: '',
    timer: 0,
    done: false,
};

export const TaskForm = () => {
    const [messageToast, setMessageToast] = useState('');
    const [date, setDate] = useState('');
    const [editTask, resetEditTask] = useTaskStore((state) => [
        state.editTask,
        state.resetEditTask,
    ]);
    const [showModal, setShowModal] = useEventStore((state) => [
        state.showModal,
        state.setShowModal,
    ]);
    const [formState, setFormState] = useState<NewTask | TaskEdit>(
        intialTaskState
    );

    useEffect(() => {
        if (editTask.id) {
            setFormState(editTask);
        }
    }, [editTask]);
    const userSession = useAuthStore((state) => state.userSession);
    const [messageAlert, setMessageAlert] = useState('');
    const [isFormDisabled, setIsFormDisabled] = useState(false);

    const todayDate = dayjs().format('YYYY-MM-DD');

    useEffect(() => {
        setDate(todayDate);
    }, [todayDate]);

    const queryClient = useQueryClient();
    const mutationCreatetask = useMutation({
        mutationFn: createTask,
        onError: () => {},
        onSuccess: () => {
            setTimeout(() => {
                setMessageAlert('');
                setShowModal(false);
                toast.success(messageToast);
                setFormState({
                    title: '',
                    description: '',
                    timer: 0,
                    done: false,
                });
                resetEditTask();
                setIsFormDisabled(false);
                queryClient.invalidateQueries({ queryKey: ['tasks'] });
            }, 2000);
        },
    });
    const mutationUpdatetask = useMutation({
        mutationFn: updateTask,
        onError: () => {},
        onSuccess: () => {
            setTimeout(() => {
                setMessageAlert('');
                setShowModal(false);
                toast.success(messageToast);
                setFormState({
                    title: '',
                    description: '',
                    timer: 0,
                    done: false,
                });
                setIsFormDisabled(false);
                resetEditTask();
                queryClient.invalidateQueries({ queryKey: ['tasks'] });
            }, 2000);
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formState.title || !formState.description) {
            setMessageAlert('Please fill all fields');
            setTimeout(() => {
                setMessageAlert('');
            }, 2000);
            return;
        }
        setIsFormDisabled(true);
        if (editTask.created_at) {
            const updatedTask = {
                ...editTask,
                title: formState.title,
                description: formState.description,
                scheduled_date: date,
            };
            mutationUpdatetask.mutate(updatedTask);
            setMessageToast('Task updated successfully');
        } else {
            const userId = userSession?.user.id;
            const newTask = {
                ...formState,
                user_id: userId,
                scheduled_date: date,
            };
            mutationCreatetask.mutate(newTask);
            setMessageToast('Task created successfully');
        }
    };

    const handleCloseModal = () => {
        setMessageAlert('');
        setShowModal(false);
        setFormState({
            title: '',
            description: '',
            timer: 0,
            done: false,
        });
        setDate(todayDate);
        resetEditTask();
        setMessageToast('');
    };
    return (
        <div
            className={`${
                showModal ? 'block' : 'hidden'
            } absolute h-full z-50 w-full bg-sky-950/80 top-0 left-0 flex justify-center items-center`}
        >
            <form
                className="bg-slate-700 p-6 rounded shadow-lg w-11/12 max-w-[28.125rem] relative"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div
                    onClick={handleCloseModal}
                    className="absolute block ring-0 right-3 top-3 cursor-pointer"
                >
                    <IoCloseSharp className="h-8 w-8 text-gray-400 text-2xl" />
                </div>
                <div className="mb-4 mt-2">
                    <label
                        htmlFor="title"
                        className="block text-white font-semibold"
                    >
                        Task title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className={`w-full p-2 mt-1 bg-[#1e2a36] focus:outline-none focus:ring-2
                        focus:ring-blue-600 focus:border-transparent text-white placeholder:text-gray-400
                            disabled:opacity-50 disabled:bg-gray-800 disabled:cursor-not-allowed
                        `}
                        placeholder="Task title"
                        value={formState.title}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                title: e.target.value,
                            })
                        }
                        disabled={isFormDisabled}
                    />
                </div>

                <div className=" mb-6">
                    <label
                        htmlFor="description"
                        className="block text-white font-semibold"
                    >
                        Date
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 end-3 flex items-center ps-3.5 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input
                            type="date"
                            className={`w-full p-2.5 mt-1 bg-[#1e2a36] focus:outline-none focus:ring-2
                        focus:ring-blue-600 focus:border-transparent text-white placeholder:text-gray-400 resize-none
                        disabled:opacity-50 disabled:bg-gray-800 disabled:cursor-not-allowed
                        `}
                            placeholder="Select date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            disabled={isFormDisabled}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-white font-semibold"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className={`w-full p-2 mt-1 bg-[#1e2a36] focus:outline-none focus:ring-2
                        focus:ring-blue-600 focus:border-transparent text-white placeholder:text-gray-400 resize-none
                        disabled:opacity-50 disabled:bg-gray-800 disabled:cursor-not-allowed
                        `}
                        placeholder="Task description"
                        value={formState.description}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                description: e.target.value,
                            })
                        }
                        disabled={isFormDisabled}
                    />
                </div>
                <div>
                    <button
                        className="p-3 bg-blue-600 text-white hover:bg-blue-700 rounded font-medium flex items-center gap-x-2 transition-colors w-full justify-center 
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-800 disabled:hover:bg-blue-800
                        "
                        type="submit"
                        disabled={isFormDisabled}
                    >
                        {editTask.created_at ? (
                            <>
                                <GrUpdate />
                                Update Task
                            </>
                        ) : (
                            <>
                                <GrAdd />
                                Add Task
                            </>
                        )}
                    </button>
                </div>
                {messageAlert && (
                    <div className="mt-4 text-gray-100 text-sm text-center bg-red-500/70 py-1 rounded capitalize">
                        {messageAlert}
                    </div>
                )}
            </form>
        </div>
    );
};
