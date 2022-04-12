import type { NextPage } from 'next';
import Head from 'next/head';
import DLink from '@/components/generic/DLink';
import Image from 'next/image';
import Layout from '../components/navigation/Layout';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

const LoginPage: NextPage = () => (
  <Layout>
    <Head>
      <title>Todo | Login Page</title>
    </Head>

    <div className='w-full h-full flex-grow bg-slate-900'>
      <div className='w-full h-full flex flex-col-reverse md:flex-row place-content-between'>
        <div className='w-full md:w-1/2 flex flex-col py-24 pl-8 md:pl-20 items-start place-content-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-slate-50'>
            Login
          </h1>
          <div className='w-full flex items-center justify-start mt-5 py-2'>
            <DLink
              href={`${backendUrl}/auth/login/google`}
              size='base'
              theme='secondary'
              title='login'
            >
              <svg
                className='w-5 h-5 inline-block mr-2'
                viewBox='0 0 48 48'
              >
                <path d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z' fill='#FFC107' />
                <path d='m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z' fill='#FF3D00' />
                <path d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z' fill='#4CAF50' />
                <path d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z' fill='#1976D2' />
              </svg>
              Login with Google
            </DLink>
          </div>
        </div>

        <div className='w-1/2 relative hidden md:flex flex-wrap'>
          <Image
            alt='Todo'
            className='w-full h-full'
            layout='fill'
            objectFit='cover'
            priority
            src='/images/bg-desktop.png'
          />
        </div>
        <div className='w-full flex-1 md:flex-none relative flex md:hidden flex-wrap'>
          <Image
            alt='Todo'
            className='w-full h-full'
            layout='fill'
            objectFit='cover'
            priority
            src='/images/bg-mobile.png'
          />
        </div>
      </div>
    </div>
  </Layout>
);
export default LoginPage;
