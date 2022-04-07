import axios from '@/lib/axios';
import type { Todo } from '@/components/todo/TodoContainer';

const getTodo = () => axios.get('/v1/todo');

const createTodo = async (text: string): Promise<{ todo: Todo }> => axios.post('/v1/todo', { text });

const deleteTodo = async (id: string): Promise<{ id: string }> => axios.delete(`/v1/todo/${id}`);

const markAsDoneTodo = async (id: string, done: boolean): Promise<{ todo: Todo }> => axios.post(`/v1/todo/mark-as-done/${id}`, { done });

export default {
  getTodo,
  createTodo,
  deleteTodo,
  markAsDoneTodo,
};
