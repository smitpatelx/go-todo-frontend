import { motion } from 'framer-motion';
import type { FunctionComponent } from 'react';
import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode
};

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const spring = {
  type: 'tween',
  duration: 0.4,
};

const Layout: FunctionComponent<LayoutProps> = ({ children }: LayoutProps): JSX.Element => (
  <motion.main
    animate='enter'
    className='flex-1 flex flex-col flex-wrap overflow-x-hidden overflow-y-auto'
    exit='exit'
    initial='hidden'
    transition={spring}
    variants={variants}
  >
    {children}
  </motion.main>
);

export default Layout;
