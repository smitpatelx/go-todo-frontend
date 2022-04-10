import type { NextPage } from 'next';
import Head from 'next/head';
import DIcon from '@/components/generic/DIcon';
import DLink from '@/components/generic/DLink';
import { mdiGoogle } from '@mdi/js';
import Layout from '../components/navigation/Layout';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

const LoginPage: NextPage = () => (
  <Layout>
    <Head>
      <title>Todo | Login Page</title>
    </Head>

    <div className='w-full h-full flex-grow flex flex-wrap items-center justify-center'>
      <div className='w-full max-w-sm bg-transparent px-2'>
        <div className='w-full rounded-lg shadow-xl bg-sky-800 py-12 px-6'>
          <h1 className='w-full text-3xl text-center font-bold text-sky-500'>Login</h1>

          <div className='w-full py-3 flex items-center justify-center'>
            <DLink
              href={`${backendUrl}/auth/login/google`}
              size='base'
              theme='accent'
              title='login'
            >
              <DIcon
                className='w-5 h-5 mr-2 text-yellow-500'
                icon={mdiGoogle}
              />
              Login with Google
            </DLink>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
export default LoginPage;
