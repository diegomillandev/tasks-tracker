import { create } from 'zustand';
import { TaskEdit } from '../types';

interface TaskStore {
    editTask: TaskEdit;
    setEditTask: (task: TaskEdit) => void;
    resetEditTask: () => void;
}

const taskState: TaskEdit = {
    id: 0,
    title: '',
    description: '',
    created_at: '',
    timer: 0,
    done: false,
    user_id: '',
};

export const useTaskStore = create<TaskStore>((set) => ({
    editTask: taskState,
    setEditTask: (task) => set({ editTask: task }),
    resetEditTask: () => set({ editTask: taskState }),
}));
