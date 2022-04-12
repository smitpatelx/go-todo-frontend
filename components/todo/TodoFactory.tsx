import { mdiCheck } from '@mdi/js';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import DButton from '../generic/DButton';
import DIcon from '../generic/DIcon';

type TodoFactoryProps = {
  id: string,
  text: string,
  done: boolean,
  isSelected: boolean,
  select: (id: string) => void,
};

const TodoFactory = ({
  text,
  id,
  done,
  isSelected,
  select,
}: TodoFactoryProps) => (
  <div
    className='w-full flex flex-wrap items-center bg-slate-100
    bg-opacity-10 py-1.5 px-4 rounded shadow-md focus:outline-none
    pointer-events-auto'
    onClick={() => select(id)}
    onKeyDown={(e) => { if (e.key === 'Enter') select(id); }}
    role='button'
    tabIndex={-1}
  >
    <div className={classNames(
      'w-5/6 text-sm font-medium whitespace-pre-wrap',
      'flex items-start justify-start',
      {
        'line-through text-slate-400': done,
        'text-slate-100': !done,
      },
    )}
    >
      <DButton
        className={
          classNames(
            'm-2 mr-4 float-left transition-all',
            'duration-300 ease-out text-slate-700',
            'rounded-full p-1  shadow-inner',
            {
              'bg-white': isSelected,
              'bg-slate-300': !isSelected,
            },
          )
        }
        onClick={(e) => { e.stopPropagation(); select(id); }}
        size=''
        theme=''
      >
        {isSelected
          ? (
            <motion.div
              key='selected'
              animate={{ scale: 1, opacity: 1 }}
              className='w-5 h-5 overflow-hidden'
              exit={{ scale: 0, opacity: 0 }}
              initial={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, type: 'tween' }}
            >
              <DIcon className='w-5 h-5' icon={mdiCheck} />
            </motion.div>
          )
          : (
            <motion.div
              key='not-selected'
              animate={{ scale: 1, opacity: 1 }}
              className='w-5 h-5 overflow-hidden'
              exit={{ scale: 0, opacity: 0 }}
              initial={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, type: 'tween' }}
            />
          )}
      </DButton>
      <span className='select-none pointer-events-none pt-1.5'>{text}</span>
    </div>
  </div>
);

export default TodoFactory;
