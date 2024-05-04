import { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { IoCloseSharp } from 'react-icons/io5';
import { useEventStore } from '../store/events';
import { useTaskStore } from '../store/tasks';
import useAuthStore from '../store/auth';

export const TaskForm = () => {
    const [showModal, setShowModal] = useEventStore((state) => [
        state.showModal,
        state.setShowModal,
    ]);
    const [formState, setFormState] = useState({
        title: '',
        description: '',
        timer: 0,
        done: false,
    });
    const userSession = useAuthStore((state) => state.userSession);

    const [messageAlert, setMessageAlert] = useState('');
    const [isFormDisabled, setIsFormDisabled] = useState(false);

    const [setNewTask, getTasksById] = useTaskStore((state) => [
        state.setNewTask,
        state.getTasksById,
    ]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formState.title || !formState.description) {
            setMessageAlert('Please fill all fields');
            setTimeout(() => {
                setMessageAlert('');
            }, 2000);
            return;
        }
        if (userSession?.user.id) {
            setIsFormDisabled(true);
            await setNewTask({ ...formState, user_id: userSession.user.id });
        }
        setFormState({
            title: '',
            description: '',
            timer: 0,
            done: false,
        });
        setShowModal(false);
        setIsFormDisabled(false);
        getTasksById(userSession?.user.id || '');
    };

    return (
        <div
            className={`${
                showModal ? 'block' : 'hidden'
            } absolute h-full z-50 w-full bg-sky-950/80 top-0 left-0 flex justify-center items-center`}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-slate-700 p-6 rounded shadow-lg w-11/12 max-w-[28.125rem] relative"
                autoComplete="off"
            >
                <div
                    onClick={() => setShowModal(false)}
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
                <div className="">
                    <button
                        className="p-3 bg-blue-600 text-white hover:bg-blue-700 rounded font-medium flex items-center gap-x-2 transition-colors w-full justify-center 
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-800 disabled:hover:bg-blue-800
                        "
                        type="submit"
                        disabled={isFormDisabled}
                    >
                        <GrAdd />
                        Add Task
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
