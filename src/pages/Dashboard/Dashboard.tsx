import { Calendar, TaskForm, TasksList } from '../../components';

export const Dashboard = () => {
    return (
        <div className="w-11/12 mx-auto mt-10 grid md:grid md:grid-cols-4 lg:grid-cols-10 xl:grid-cols-12 gap-5">
            <div className="order-last md:order-first md:col-span-2 lg:col-span-6 xl:col-span-8">
                <TasksList />
            </div>
            <div className="md:col-span-2 lg:col-span-4 xl:col-span-4">
                <Calendar />
            </div>
            <TaskForm />
        </div>
    );
};
