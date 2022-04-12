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
  title?: string,
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
  const { asPath } = useRouter();
  const [isActive, setIsActive] = useState(asPath === href);

  useEffect(() => {
    setIsActive(asPath === href);
  }, [href, asPath]);

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
            : 'focus:outline-none flex flex-wrap items-center'),
          className,
          {
            'bg-slate-800 text-slate-100 focus:ring-sky-500 focus-visible:ring-sky-300 focus:ring-offset-cyan-900': theme === 'primary',
            'bg-slate-600 text-slate-50 hover:bg-opacity-100 focus:ring-sky-500 focus-visible:ring-sky-500 focus:ring-offset-cyan-900': theme === 'secondary',
            'bg-sky-600 text-sky-100 focus:ring-sky-400 focus-visible:ring-sky-400 focus:ring-offset-cyan-900': theme === 'accent',

            'py-1.5 px-3.5 text-sm': size === 'sm',
            'py-2 px-4 text-base': size === 'base',
            'py-2.5 px-6 text-lg': size === 'lg',

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
  title: '',
  theme: '',
  size: '',
  className: '',
  activeClass: { active: '', inactive: '' },
};

export default DLink;
