export interface Task {
    title: string;
    description: string;
    timer: number;
    done: boolean;
    user_id: string;
}

export interface Taskdb extends Task {
    id: string;
}
