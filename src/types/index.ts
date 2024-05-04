export interface Task {
    title: string;
    description: string;
    timer: number;
    done: boolean;
    user_id: string | undefined;
}
export interface TaskEdit {
    id: number;
    created_at: string;
    description: string;
    done: boolean;
    timer: number;
    title: string;
    user_id: string;
}
export interface TaskItem extends Task {
    id: number;
}