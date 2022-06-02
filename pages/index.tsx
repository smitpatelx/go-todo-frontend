import type { NextPage } from 'next';
import Layout from '@/components/navigation/Layout';
import Head from 'next/head';
import DLink from '@/components/generic/DLink';
import { mdiChevronRight } from '@mdi/js';
import DIcon from '@/components/generic/DIcon';
import SpxImage from '@/components/generic/SpxImage';
import GuestRequired from '@/components/navigation/GuestRequired';

const Home: NextPage = () => (
  <GuestRequired>
    <Layout>
      <Head>
        <title>Todo | Home Page</title>
      </Head>
      <div className='w-full h-full flex-grow bg-slate-900'>
        <div className='w-full h-full flex flex-col-reverse md:flex-row place-content-between'>
          <div className='w-full md:w-1/2 flex flex-col py-12 pl-8 md:pl-20 items-start place-content-center'>
            <h1 className='text-6xl md:text-9xl font-bold text-slate-50'>
              Todo
            </h1>
            <h2 className='text-3xl md:text-5xl font-semibold text-slate-400 pl-3 md:pl-6'>
              Built using GO
            </h2>
            <h3 className='text-xl md:text-2xl font-semibold text-slate-600 pl-3 md:pl-6'>
              Author -
              <DLink
                className='inline-flex ml-2 hover:text-slate-200 focus:underline'
                href='https://smitpatelx.com'
                size=''
                target='_blank'
                theme=''
                title='author'
              >
                smitpatelx.com
              </DLink>
            </h3>
    
            <div className='w-full flex items-center justify-start mt-10 py-2 pl-3 md:pl-6'>
              <DLink
                href='/login/'
                size='base'
                theme='secondary'
                title='author'
              >
                Get Started
                <DIcon className='w-5 h-5 ml-2' icon={mdiChevronRight} />
              </DLink>
            </div>
          </div>
    
          <div className='w-1/2 relative hidden md:flex flex-wrap'>
            <SpxImage
              alt='Todo'
              className='w-full h-full'
              layout='fill'
              objectFit='cover'
              objectPosition='left'
              priority
              src='/images/bg-desktop.png'
            />
          </div>
          <div className='w-full flex-1 md:flex-none relative flex md:hidden flex-wrap'>
            <SpxImage
              alt='Todo'
              className='w-full h-full'
              layout='fill'
              objectFit='cover'
              objectPosition='bottom'
              priority
              src='/images/bg-mobile.png'
            />
          </div>
        </div>
      </div>
    </Layout>
  </GuestRequired>
);
export default Home;
