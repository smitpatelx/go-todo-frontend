import axios from '@/lib/axios';
import type { Todo } from '@/components/todo/TodoContainer';

const getTodo = () => axios.get('/v1/todo', { withCredentials: true });

const createTodo = async (text: string): Promise<{ todo: Todo }> => axios.post('/v1/todo', { text }, { withCredentials: true });

const deleteTodo = async (id: string): Promise<{ id: string }> => axios.delete(`/v1/todo/${id}`, { withCredentials: true });

const markAsDoneTodo = async (id: string, done: boolean): Promise<{ todo: Todo }> => axios.post(`/v1/todo/mark-as-done/${id}`, { done }, { withCredentials: true });

export default {
  getTodo,
  createTodo,
  deleteTodo,
  markAsDoneTodo,
};
