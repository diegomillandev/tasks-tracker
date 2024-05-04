import dayjs from 'dayjs';
import { cn, months } from '../helpers';
import { generateDate } from '../utils/calendar';
import { useEffect } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useCalendarStore } from '../store/calendar';

export const Calendar = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const [today, selectedDate, setToday, setSelectedDate] = useCalendarStore(
        (state) => [
            state.today,
            state.selectedDate,
            state.setToday,
            state.setSelectedDate,
        ]
    );
    const currentDate = dayjs();

    useEffect(() => {
        setSelectedDate(currentDate);
    }, []);
    // const [today, setToday] = useState(currentDate);
    // const [selectedDate, setSelectedDate] = useState(currentDate);
    return (
        <div className="w-[98%] bg-[#1e2a36] rounded px-4 pt-4 pb-2 border border-gray-700 mx-auto">
            <div className="flex justify-between">
                <div className="text-gray-100">
                    {months[today.month()]}, {today.year()}
                </div>
                <div className="flex items-center gap-5 text-gray-100">
                    <GrFormPrevious
                        className="h-6 w-6 cursor-pointer hover:bg-gray-600 rounded-full"
                        onClick={() => {
                            setToday(today.subtract(1, 'month'));
                        }}
                    />
                    <p
                        className="cursor-pointer capitalize text-lg"
                        onClick={() => setToday(currentDate)}
                    >
                        today
                    </p>
                    <GrFormNext
                        className="h-6 w-6 cursor-pointer hover:bg-gray-600 rounded-full"
                        onClick={() => {
                            setToday(today.add(1, 'month'));
                        }}
                    />
                </div>
            </div>
            <div className="w-full grid grid-cols-7">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className="h-14 grid place-content-center text-sm text-gray-400"
                    >
                        <div>{day}</div>
                    </div>
                ))}
            </div>
            <div className="w-full grid grid-cols-7">
                {generateDate(today.month(), today.year()).map(
                    ({ date, currentMont, today }, index) => (
                        <div
                            key={index}
                            className="h-14 border-t-[.0625rem] border-gray-500 grid place-content-center"
                        >
                            <div
                                className={cn(
                                    currentMont
                                        ? 'text-white'
                                        : 'text-gray-900',
                                    today ? 'bg-red-600 text-white' : '',
                                    selectedDate.toDate().toDateString() ===
                                        date.toDate().toDateString()
                                        ? 'bg-blue-600 text-white'
                                        : '',
                                    'w-10 h-10 grid place-content-center rounded-full hover:bg-blue-700 hover:text-white cursor-pointer transition-all'
                                )}
                                onClick={() => {
                                    setSelectedDate(date);
                                }}
                            >
                                {date.date()}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};
