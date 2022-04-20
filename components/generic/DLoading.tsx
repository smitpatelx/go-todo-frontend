import Head from 'next/head';
import { FunctionComponent } from 'react';
import classNames from 'classnames';
import Lottie from 'react-lottie';
import * as SpaceMan from '@/public/lottie-animation/space-anim.json';
import SpxImage from '@/components/generic/SpxImage';

const DLoading: FunctionComponent = () => (
  <>
    <Head>
      <title>Todo | Loading ...</title>
    </Head>
    <div className={classNames(
      'flex-1 w-full h-full flex flex-wrap items-center justify-center z-[100]',
      'bg-slate-900 fixed top-0 bottom-0 left-0 right-0',
    )}
    >
      <div className='bg-transparent rounded-2xl text-center flex flex-wrap flex-col
        items-center flip-horizontal-bottom text-2xl font-bold text-slate-100'
      >
        <SpxImage
          alt='TODO'
          className='animate-pulse duration-500'
          height={100}
          src='/images/blue-logo-transparent-w.svg'
          width={200}
        />
        <div className='block relative h-56 opacity-70'>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: SpaceMan,
            }}
          />
        </div>
      </div>
    </div>
  </>
);
export default DLoading;
