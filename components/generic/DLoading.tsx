import Head from 'next/head';
import { FunctionComponent } from 'react';
import classNames from 'classnames';

const DLoading: FunctionComponent = () => (
  <>
    <Head>
      <title>Mufflr | Loading ...</title>
    </Head>
    <div className={classNames(
      'flex-1 w-full h-full flex flex-wrap items-center justify-center z-[100]',
      'bg-slate-800 fixed top-0 bottom-0 left-0 right-0',
    )}
    >
      <div className='bg-transparent rounded-2xl text-center flex flex-wrap flex-col
        items-center flip-horizontal-bottom text-2xl font-bold text-slate-100'
      >
        Loading ...
      </div>
    </div>
  </>
);
export default DLoading;
