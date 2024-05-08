import { supabase } from "../supabase";
import { Task, TaskEdit } from "../types";


export const getUserTasks = async (userId: string | undefined) => {
        const { data, error } = await supabase.from('tasks').select('*').eq('user_id', userId).order('id', { ascending: true });
        if (error) {
            console.error('Error getting user tasks:', error);
            return;
        }
        return data
};

export const createTask = async (task: Task) => {
    const { error } = await supabase.from('tasks').insert(task);
    if (error) {
        console.error('Error inserting new task:', error);
        return;
    }
}

export const deleteTask = async (taskId: number) => {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (error) {
        console.error('Error deleting task:', error);
        return;
    }
};

export const updateTask = async (task: TaskEdit) => {
    const { error } = await supabase.from('tasks').update(task).eq('id', task.id);
    if (error) {
        console.error('Error updating task:', error);
        return;
    }
};

export const updateTaskTimer = async ({id, timer, user_id}:{id: number, timer: number, user_id: string}) => {
    const { error } = await supabase
        .from('tasks')
        .update({ timer: timer })
        .eq('id', id)
        .eq('user_id', user_id);

    if (error) {
        console.error('Error updating task:', error);
    }
}
