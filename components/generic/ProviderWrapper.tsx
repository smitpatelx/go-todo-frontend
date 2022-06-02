import React from 'react';
import Header from '@/components/navigation/Header';
import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import style from '@/styles/Home.module.scss';
import useAuthGuard from '@/lib/useAuthGuard';

type ProviderWrapperType = {
  children: React.ReactChild | React.ReactChild[],
};

const ProviderWrapper: React.FC<ProviderWrapperType> = ({
  children,
}: ProviderWrapperType) => {
  useAuthGuard();

  return (
    <div className={classNames(style.bgImage, 'h-full')}>
      <div className='flex flex-wrap flex-col h-full'>
        <Header />
        <AnimatePresence
          exitBeforeEnter
          initial={false}
        >
          {children}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProviderWrapper;
