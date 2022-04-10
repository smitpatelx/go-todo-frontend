import type { FunctionComponent } from 'react';
import Image from 'next/image';
import Head from 'next/head';

type DErrorProps = {
  title: string,
  description: string,
};

const DError: FunctionComponent<DErrorProps> = ({
  title,
  description,
}: DErrorProps) => (
  <>
    <Head>
      <title>Todo | Error Page</title>
    </Head>
    <div className='flex-1 flex flex-col flex-wrap overflow-x-hidden overflow-y-auto w-full h-full items-start justify-between container mx-auto py-12 px-6 '>
      <div className='flex flex-wrap flex-col gap-y-2'>
        <h1 className='text-3xl font-bold font-serif text-slate-800'>Error</h1>
        <h2 className='text-xl font-semibold font-sans text-sky-800'>{title}</h2>
        <h3 className='text-base font-normal font-sans text-slate-600'>{description}</h3>
      </div>
      <div className='py-6 md:pt-20 md:pb-8 flex flex-wrap items-center
            justify-center md:justify-start w-full md:-ml-12'
      >
        <Image
          alt='Welcome'
          height={240}
          src='/images/error.svg'
          width={336}
        />
      </div>
    </div>
  </>
);

export default DError;
