import { forwardRef, ReactChild } from 'react';
import ClassNames from 'classnames';

type DButtonProps = {
  children: ReactChild | ReactChild[],
  theme?: 'primary' | 'secondary' | 'accent' | '',
  size?: 'sm' | 'base' | 'lg' | '',
  type?: 'button' | 'submit' | 'reset',
  title?: string,
  className?: string,
  onClick?: () => void,
  disabled?: boolean,
};

const DButton = forwardRef<HTMLButtonElement, DButtonProps>(({
  children,
  theme,
  size,
  type,
  title,
  className,
  onClick,
  disabled,
}: DButtonProps, ref) => (
  <button
    ref={ref}
    className={
      ClassNames(
        'focus:outline-none flex flex-wrap items-center justify-center select-none',
        (theme !== ''
          ? `rounded-md shadow font-semibold transition-all duration-200 ease-out
        focus-visible:ring focus:ring focus:ring-offset-2 focus-visible:ring-offset-2`
          : ''),
        className,
        {
          'bg-sky-600 text-sky-100 focus:ring-cyan-500 focus-visible:ring-cyan-500 focus:ring-offset-cyan-900': theme === 'primary',
          'bg-sky-800 bg-opacity-20 text-sky-800 hover:text-sky-100 hover:bg-opacity-100 focus:ring-sky-500 focus-visible:ring-sky-500': theme === 'secondary',
          'bg-d-orange text-sky-100 focus:ring-orange-400 focus-visible:ring-orange-400': theme === 'accent',

          'py-1.5 px-6 text-sm': size === 'sm',
          'py-2 px-6 text-base': size === 'base',
          'py-2.5 px-6 text-lg': size === 'lg',

          'cursor-pointer hover:bg-opacity-80 hover:text-opacity-80': !disabled,
          'cursor-not-allowed bg-slate-500 text-slate-300': disabled,
        },
      )
    }
    disabled={disabled}
    onClick={onClick}
    title={title}
    type={type}
  >
    {children}
  </button>
));

DButton.defaultProps = {
  theme: 'primary',
  size: 'base',
  type: 'button',
  title: '',
  className: '',
  onClick: () => null,
  disabled: false,
};

export default DButton;
