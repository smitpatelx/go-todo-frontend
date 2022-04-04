import { mdiDelete, mdiCheck, mdiClose } from '@mdi/js';
import classNames from 'classnames';
import DButton from '../generic/DButton';
import DIcon from '../generic/DIcon';

type TodoFactoryProps = {
  id: string,
  text: string,
  done: boolean,
  deleteTodo: (id: string) => void,
  markAsDonw: (id: string) => void
};

const TodoFactory = ({
  text,
  id,
  done,
  deleteTodo,
  markAsDonw,
}: TodoFactoryProps) => (
  <div
    className='w-full flex flex-wrap items-center bg-sky-100
    bg-opacity-10 py-1.5 px-4 rounded shadow-md focus:outline-none
    focus:ring focus:ring-cyan-500 focus:ring-offset-0'
    onClick={() => markAsDonw(id)}
    onKeyDown={(e) => { if (e.key === 'Enter') markAsDonw(id); }}
    role='button'
    tabIndex={0}
  >
    <div className={classNames(
      'w-5/6 text-sm font-medium text-sky-100 whitespace-pre-wrap',
      {
        'line-through text-sky-600': done,
      },
    )}
    >
      <DButton
        className={
          classNames(
            'mr-2 mb-2 float-left transition-all',
            'duration-300 ease-out text-sky-300',
            {
              'hover:text-red-400': done,
              'hover:text-green-400': !done,
            },
          )
        }
        onClick={() => markAsDonw(id)}
        size=''
        theme=''
      >
        <DIcon className='w-5 h-5' icon={done ? mdiClose : mdiCheck} />
      </DButton>
      <span>{text}</span>
    </div>
    <div className='w-1/6 flex flex-wrap items-center justify-end'>
      <DButton
        className='text-sky-300 hover:text-red-400
        transition-all duration-300 ease-out'
        onClick={() => deleteTodo(id)}
        size=''
        theme=''
      >
        <DIcon className='w-5 h-5' icon={mdiDelete} />
      </DButton>
    </div>
  </div>
);

export default TodoFactory;
