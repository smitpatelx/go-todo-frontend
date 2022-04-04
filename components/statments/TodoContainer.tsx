import { mdiPlus } from '@mdi/js';
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
import { filterObject } from '@/lib/misc';
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

type TodoObjects = {
  [id: string]: Todo
};

const TodoContainer: FunctionComponent = () => {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<TodoObjects>({} as TodoObjects);
  const fetchedTodos: UseQueryResult<{ todo: Todo[] }> = useQuery('todo', TodoApi.getTodo, {
    onSuccess: (res: { todo: Todo[] }) => {
      const result = res.todo;
      setTodos((preV) => result.reduce((pre, x) => ({
        ...pre,
        [x.id]: x,
      }), preV));
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
        return setTodos((preTodos) => ({ ...preTodos, [result.id]: result }));
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
        // (preTodos) => ({ ...filterObject(preTodos, (obj) => obj[0] !== res.id) as TodoObjects }),
        (preTodos) => {
          const newPreTodos = { ...preTodos };
          if (newPreTodos[res.id]) delete newPreTodos[res.id];
          return newPreTodos;
        },
      ),
    },
  );

  const handleDeleteTodo = (id: string) => {
    deleteTodo.mutate(id);
  };

  const markAsDoneTodo = useMutation(
    async (id: string) => {
      const res = await TodoApi.markAsDoneTodo(id);
      return res;
    },
    {
      onSuccess: (res: { todo: Todo }) => {
        const { todo } = res;
        setTodos(
          (preTodos) => ({
            ...filterObject(preTodos, (obj) => obj[0] !== res.todo.id) as TodoObjects,
            [todo.id]: todo,
          }),
        );
      },
    },
  );

  const handleMarkAsDone = (id: string) => {
    markAsDoneTodo.mutate(id);
  };

  const todoArray = useMemo(() => Object.values(todos).sort(
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
        <div className='w-full max-w-xl bg-sky-900 flex-grow
        rounded-lg shadow-xl my-auto p-4 md:p-6 md:max-h-[90%] flex flex-col-reverse md:flex-col'
        >
          <div className={style.inputContainer}>
            <div className='flex flex-wrap'>
              <div className='w-5/6 flex flex-wrap'>
                <input
                  className=''
                  id='text'
                  onChange={(e) => setTodoText(e.target.value)}
                  onKeyDown={handleAddTodo}
                  placeholder='Add new todo'
                  type='text'
                  value={todoText}
                />
              </div>
              <div className='w-1/6 flex flex-wrap justify-end'>
                <DButton className='p-2 px-4' onClick={() => addTodo.mutate(todoText)} size=''>
                  <DIcon className='w-6 h-6' icon={mdiPlus} />
                </DButton>
              </div>
            </div>
          </div>

          <div className='w-full flex-grow mb-8 md:mb-0 mt-0 md:mt-8 overflow-x-hidden overflow-y-auto
            flex flex-col p-1'
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
              {(todos && todoArray?.length > 0)
                && todoArray.map((todoX: Todo) => (
                  <motion.li
                    key={todoX.id}
                    className='pb-2'
                    title={new Date(todoX.created_at).toLocaleString()}
                    variants={{
                      hidden: { opacity: 0, x: '100%' },
                      show: { opacity: 1, x: '0%' },
                      exit: { opacity: 0, x: '100%' },
                    }}
                  >
                    <TodoFactory
                      deleteTodo={handleDeleteTodo}
                      done={todoX.done}
                      id={todoX.id}
                      markAsDonw={handleMarkAsDone}
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
