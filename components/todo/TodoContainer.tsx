import {
  mdiCheck, mdiClose, mdiDelete, mdiPlus,
} from '@mdi/js';
import Head from 'next/head';
import {
  FunctionComponent, KeyboardEventHandler, useMemo, useState,
} from 'react';
import style from '@/styles/Forms.module.scss';
import { motion } from 'framer-motion';
import {
  useQuery, useMutation, UseQueryResult,
} from 'react-query';
import TodoApi from '@/api/todo';
import classNames from 'classnames';
import Layout from '../navigation/Layout';
import DButton from '../generic/DButton';
import DIcon from '../generic/DIcon';
import TodoFactory from './TodoFactory';
import DLoading from '../generic/DLoading';

export type Todo = {
  text: string,
  done: boolean,
  id: string,
  created_at: string
};

const TodoContainer: FunctionComponent = () => {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([] as Todo[]);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([] as Todo[]);

  const fetchedTodos: UseQueryResult<{ todo: Todo[] }> = useQuery('todo', TodoApi.getTodo, {
    onSuccess: (res: { todo: Todo[] }) => {
      const result = res.todo;
      if (todos === result) return;
      setTodos(result);
    },
  });

  const addTodo = useMutation(
    async (text: string) => {
      const res = await TodoApi.createTodo(text);
      return res;
    },
    {
      onSuccess: (res: { todo: Todo }) => {
        const result = res.todo;
        setTodoText('');
        return setTodos((preTodos) => ([...preTodos, result]));
      },
    },
  );

  const handleAddTodo: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      addTodo.mutate(todoText);
    }
  };

  const deleteTodo = useMutation(
    async (id: string) => {
      const res = await TodoApi.deleteTodo(id);
      return res;
    },
    {
      onSuccess: (res: { id: string }) => setTodos(
        (preTodos) => ([...preTodos.filter((x) => x.id !== res.id)]),
      ),
    },
  );

  const handleDeleteTodos = (todosX: Todo[]) => {
    todosX.forEach((x) => deleteTodo.mutate(x.id));
    setSelectedTodos([]);
  };

  const markAsDoneTodo = useMutation(
    async ({
      id,
      done,
    }: { id: string, done: boolean }) => {
      const res = await TodoApi.markAsDoneTodo(id, done);
      return res;
    },
    {
      onSuccess: (res: { todo: Todo }) => {
        const { todo } = res;
        setTodos(
          (preTodos) => ([
            ...preTodos.filter((x) => x.id !== res.todo.id),
            todo,
          ]),
        );
      },
    },
  );

  const handleMarkAsDone = (todosX: Todo[]) => {
    todosX.forEach((x) => markAsDoneTodo.mutate({
      id: x.id,
      done: true,
    }));
    setSelectedTodos([]);
  };

  const handleMarkAsIncomplete = (todosX: Todo[]) => {
    todosX.forEach((x) => markAsDoneTodo.mutate({
      id: x.id,
      done: false,
    }));
    setSelectedTodos([]);
  };

  const handleSelect = (id: string) => {
    const isTodoDuplicate = selectedTodos.find((x) => x.id === id);
    const todo = todos.find((x) => x.id === id);

    if (!isTodoDuplicate) {
      setSelectedTodos(
        (selectedTodosX) => ([...selectedTodosX, todo as Todo]),
      );
      return;
    }
    setSelectedTodos((selectedTodosX) => selectedTodosX.filter((x) => x.id !== id));
  };

  const handleSelectAll = () => {
    if (selectedTodos.length === todos.length) {
      setSelectedTodos([] as Todo[]);
      return;
    }
    setSelectedTodos(todos);
  };

  const isSelected = (id: string) => !!selectedTodos.find((x) => x.id === id);

  const todoArray = useMemo(() => todos.sort(
    (a: Todo, b: Todo) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  ), [todos]);

  if (fetchedTodos.isLoading) {
    return <DLoading />;
  }

  return (
    <Layout>
      <Head>
        <title>Go Todo</title>
      </Head>
      <div className='w-full flex-grow flex flex-col items-center
       overflow-hidden p-2 md:p-0 flex-wrap justify-start'
      >
        <div className='w-full md:max-w-xl bg-sky-900 flex-grow
        rounded-lg shadow-xl my-auto p-4 md:p-6 h-full max-h-screen
        md:max-h-[90%] flex flex-col-reverse md:flex-col relative'
        >
          <div className={classNames(
            style.inputContainer,
            'relative pt-2 md:py-2',
          )}
          >
            <div className='flex flex-wrap'>
              <div className='w-full flex flex-wrap relative'>
                <input
                  autoComplete='off'
                  autoCorrect='off'
                  autoSave='off'
                  className='py-3 px-4'
                  id='text'
                  onChange={(e) => setTodoText(e.target.value)}
                  onKeyDown={handleAddTodo}
                  placeholder='Add new todo'
                  type='text'
                  value={todoText}
                />
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2
                flex flex-wrap justify-end z-20'
                >
                  <DButton
                    className='p-1.5 rounded-full'
                    onClick={() => addTodo.mutate(todoText)}
                    size=''
                    theme='primary'
                  >
                    <DIcon className='w-5 h-5' icon={mdiPlus} />
                  </DButton>
                </div>
              </div>
            </div>
            <div className='overflow-x-auto flex flex-nowrap flex-row
              overflow-y-hidden w-full scroll-hidden place-content-start p-2'
            >
              <div className='mr-2 flex-shrink-0'>
                <DButton
                  className='hover:bg-red-400'
                  onClick={() => handleSelectAll()}
                  size='sm'
                  theme='accent'
                >
                  <span>Select All</span>
                </DButton>
              </div>
              <div className='mr-2 flex-shrink-0'>
                <DButton
                  className='hover:bg-red-400'
                  onClick={() => handleDeleteTodos(selectedTodos)}
                  size='sm'
                  theme='accent'
                >
                  <span>Delete</span>
                  <DIcon className='w-4 h-4 ml-2' icon={mdiDelete} />
                </DButton>
              </div>
              <div className='mr-2 flex-shrink-0'>
                <DButton
                  onClick={() => handleMarkAsDone(selectedTodos)}
                  size='sm'
                  theme='accent'
                >
                  <span>Done</span>
                  <DIcon className='w-4 h-4 ml-2' icon={mdiCheck} />
                </DButton>
              </div>
              <div className='mr-2 flex-shrink-0'>
                <DButton
                  onClick={() => handleMarkAsIncomplete(selectedTodos)}
                  size='sm'
                  theme='accent'
                >
                  <span>Incomplete</span>
                  <DIcon className='w-4 h-4 ml-2' icon={mdiClose} />
                </DButton>
              </div>
            </div>
          </div>

          <div className='w-full flex-grow mb-1 md:mb-0 overflow-x-hidden
            overflow-y-auto flex flex-col p-1'
          >
            <motion.ul
              animate='show'
              initial='hidden'
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.5,
                  },
                },
              }}
            >
              {todoArray?.length > 0
                && todoArray.map((todoX: Todo) => (
                  <motion.li
                    key={todoX.id}
                    className='mb-2 pointer-events-none focus:touch-none focus:appearance-none
                      select-none'
                    title={new Date(todoX.created_at).toLocaleString()}
                    variants={{
                      hidden: { opacity: 0, x: '100%' },
                      show: { opacity: 1, x: '0%' },
                      exit: { opacity: 0, x: '100%' },
                    }}
                  >
                    <span className='text-sm text-white'>{selectedTodos.includes(todoX)}</span>
                    <TodoFactory
                      done={todoX.done}
                      id={todoX.id}
                      isSelected={isSelected(todoX.id)}
                      select={handleSelect}
                      text={todoX.text}
                    />
                  </motion.li>
                ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TodoContainer;
