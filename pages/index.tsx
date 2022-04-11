import type { NextPage } from 'next';
import Layout from '@/components/navigation/Layout';
import Head from 'next/head';
import DLink from '@/components/generic/DLink';
import { mdiChevronRight } from '@mdi/js';
import DIcon from '@/components/generic/DIcon';
import Image from 'next/image';

const Home: NextPage = () => (
  <Layout>
    <Head>
      <title>Todo | Home Page</title>
    </Head>
    <div className='w-full h-full flex-grow'>
      <div className='w-full h-full container mx-auto flex flex-col px-4 md:px-0 place-content-between'>
        <div className='w-full flex flex-col py-12'>
          <h1 className='text-6xl md:text-8xl font-bold text-slate-900'>
            TODO
          </h1>
          <h2 className='text-5xl md:text-7xl font-semibold text-slate-900'>
            Built using
            <span className='ml-3 text-sky-500'>GO</span>
          </h2>
          <h3 className='text-xl md:text-2xl font-semibold text-slate-900 mt-3'>
            By:
            <DLink
              className='inline-flex ml-3 text-slate-600 hover:text-slate-500 focus:underline'
              href='https://smitpatelx.com'
              size=''
              target='_blank'
              theme=''
              title='author'
            >
              smitpatelx.com
            </DLink>
          </h3>

          <div className='w-full flex items-center justify-start mt-10 py-2'>
            <DLink
              href='/login/'
              size='lg'
              theme='accent'
              title='author'
            >
              Get Started
              <DIcon className='w-6 h-6 ml-2' icon={mdiChevronRight} />
            </DLink>
          </div>
        </div>

        <div className='w-full flex-1 relative flex flex-wrap mt-8'>
          <Image
            alt='Todo'
            className='w-full h-full'
            layout='fill'
            src='/images/illustration/home-art-1.svg'
          />
        </div>
      </div>
    </div>
  </Layout>
);
export default Home;
