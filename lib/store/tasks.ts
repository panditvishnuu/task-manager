import { create } from 'zustand';
import { Task } from '@/lib/types';

interface TaskStore {
  tasks: Task[];
  selectedTask: Task | null;
  filter: {
    status: string;
    priority: number | null;
    projectId: number | null;
    categoryId: number | null;
  };
  setTasks: (tasks: Task[]) => void;
  setSelectedTask: (task: Task | null) => void;
  setFilter: (filter: Partial<TaskStore['filter']>) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  selectedTask: null,
  filter: {
    status: 'all',
    priority: null,
    projectId: null,
    categoryId: null,
  },
  setTasks: (tasks) => set({ tasks }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),
}));