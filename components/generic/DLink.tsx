import { ReactChild, useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ClassNames from 'classnames';

type DLinkProps = {
  children: ReactChild | ReactChild[],
  theme?: 'primary' | 'secondary' | 'accent' | '',
  size?: 'sm' | 'base' | 'lg' | '',
  href: string,
  title: string,
  target?: '_blank' | '_self' | '_parent' | '_top', // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target
  activeClass?: {
    active: string,
    inactive: string,
  }
  className?: string,
};

const DLink: FunctionComponent<DLinkProps> = ({
  children,
  href,
  title,
  target,
  theme,
  size,
  className,
  activeClass,
}: DLinkProps) => {
  const { pathname } = useRouter();
  const [isActive, setIsActive] = useState(pathname === href);

  useEffect(() => {
    setIsActive(pathname === href);
  }, [href, pathname]);

  return (
    <Link
      href={href}
      passHref
    >
      <a
        className={ClassNames(
          (theme !== ''
            ? `focus:outline-none focus:ring rounded-md shadow font-semibold
          hover:bg-opacity-80 hover:text-opacity-80 transition-all duration-200
          ease-out focus:ring-offset-2 flex flex-wrap items-center justify-center`
            : 'focus:outline-none flex flex-wrap items-center justify-center'),
          className,
          {
            'bg-sky-800 text-sky-100 focus:ring-sky-500 active:ring-sky-500': theme === 'primary',
            'bg-sky-800 bg-opacity-20 text-sky-800 focus:ring-sky-500 active:ring-sky-500 hover:bg-opacity-30 hover:text-sky-100': theme === 'secondary',
            'bg-d-orange text-sky-100 focus:ring-orange-400 active:ring-orange-400': theme === 'accent',

            'py-1.5 px-6 text-sm': theme !== '' && size === 'sm',
            'py-2 px-6 text-base': theme !== '' && size === 'base',
            'py-2.5 px-6 text-lg': theme !== '' && size === 'lg',

            ...(activeClass?.active ? { [activeClass?.active]: isActive } : null),
            ...(activeClass?.inactive ? { [activeClass?.inactive]: !isActive } : null),
          },
        )}
        href={href}
        target={target}
        title={title}
      >
        {children}
      </a>
    </Link>
  );
};

DLink.defaultProps = {
  target: '_self',
  theme: '',
  size: '',
  className: '',
  activeClass: { active: '', inactive: '' },
};

export default DLink;
