import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  time?: string;
  priority?: number;
  tag?: string;
}

interface TodoState {
  todos: Todo[];
  addTodo: (data: any) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (data) => set((state) => ({
        todos: [...state.todos, { 
          id: Date.now().toString(), 
          completed: false,
          title: typeof data === 'string' ? data : data.title,
          ...data 
        }]
      })),
      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      })),
      deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter(t => t.id !== id)
      })),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);