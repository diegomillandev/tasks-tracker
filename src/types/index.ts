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

export interface RegisterFrom {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirm_password: string;
}

export interface LoginFrom {
    email: string;
    password: string;
}

export interface UserInfo {
    email: string;
    email_verified: boolean;
    first_name: string;
    last_name: string;
    phone_verified: boolean;
    sub: string;
}