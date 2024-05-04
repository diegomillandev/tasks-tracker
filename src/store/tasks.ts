import { create } from 'zustand';
import { Task, Taskdb } from '../types';
import { supabase } from '../supabase';

interface TaskStore {
    newTask: Task;
    TaskList: Taskdb[];
    setNewTask: (task: Task) => void;
    getTasksById: (id: string) => void;
    setTimerTask: (id: string, timer: number, user_id: string) => void;
    deleteTask: (id: string) => void;
}

const taskState = {
    title: '',
    description: '',
    timer: 0,
    done: false,
    user_id: '',
};

export const useTaskStore = create<TaskStore>((set) => ({
    newTask: taskState,
    TaskList: [],
    setNewTask: async (task) => {
        const { error } = await supabase.from('tasks').insert(task);
        if (error) {
            console.error('Error inserting new task:', error);
        }
    },
    getTasksById: async (id) => {
        const { data, error } = await supabase
            .from('tasks')
            .select()
            .eq('user_id', id)
            .order('id', { ascending: false });

        if (error) {
            console.error('Error fetching tasks:', error);
        }
        set({ TaskList: data || [] });
    },
    setTimerTask: async (id, timer, user_id) => {
        const { error } = await supabase
            .from('tasks')
            .update({ timer: timer })
            .eq('id', id)
            .eq('user_id', user_id);

        if (error) {
            console.error('Error updating task:', error);
        }
    },
    deleteTask: async (id) => {
        const { error } = await supabase.from('tasks').delete().eq('id', id);
        if (error) {
            console.error('Error deleting task:', error);
        }
    },
}));
