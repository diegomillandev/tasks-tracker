import dayjs from 'dayjs';
import { create } from 'zustand';

interface CalendarState {
    today: dayjs.Dayjs;
    selectedDate: dayjs.Dayjs;
    setToday: (today: dayjs.Dayjs) => void;
    setSelectedDate: (selectDay: dayjs.Dayjs) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
    today: dayjs(),
    selectedDate: dayjs(),
    setToday: (today) => set({ today }),
    setSelectedDate: (selectedDate) => {
        set({ selectedDate })
    },
}));