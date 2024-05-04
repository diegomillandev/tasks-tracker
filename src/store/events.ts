import { create } from 'zustand';

interface EventStore {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
}

export const useEventStore = create<EventStore>((set) => ({
    showModal: false,
    setShowModal: (showModal: boolean) => {
        set({ showModal });
    },
}));
