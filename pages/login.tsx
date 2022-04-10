import type { NextPage } from 'next';
import Head from 'next/head';
import AuthPopup from '@/components/auth/AuthPopup';
import Layout from '../components/navigation/Layout';

const LoginPage: NextPage = () => (
  <Layout>
    <Head>
      <title>Mufflr | Login Page</title>
    </Head>

    <div className='w-full h-full flex-grow flex flex-wrap items-center justify-center'>
      <div className='w-full max-w-sm bg-transparent px-2'>
        <div className='w-full rounded-lg shadow-xl bg-sky-800 py-12 px-6'>
          <h1 className='w-full text-3xl text-center font-bold text-sky-500'>Login</h1>

          <div className='w-full py-3 flex items-center justify-center'>
            <AuthPopup provider='google' />
          </div>

          {/* <h1 className='w-full text-sm text-center font-semibold text-slate-50 my-2'>OR</h1>
          <h1 className='w-full text-base text-center font-normal text-slate-50
            mt-2 mb-6'>Login with email and password</h1>
          <form
            className='w-full flex flex-wrap flex-col gap-y-4'
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={style.inputContainer}>
              <label htmlFor='email'>Email</label>
              <input autoComplete='user-name' id='email' placeholder='Email Address' type='email' />
            </div>
            <div className={style.inputContainer}>
              <label htmlFor='password'>Password</label>
              <input autoComplete='current-password' id='password'
              placeholder='Password' type='password' />
            </div>
            <div className={style.checkboxContainer}>
              <input id='terms-and-conditions' type='checkbox' />
              <label htmlFor='terms-and-conditions'>Terms and Conditions</label>
            </div>
            <div className='mt-6 flex flex-wrap items-end justify-between'>
              <DButton theme='secondary' type='reset'>
                Reset
              </DButton>
              <DButton theme='accent' type='submit'>
                Login
                <DIcon className='w-5 h-5 ml-2' icon={mdiLogin} />
              </DButton>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  </Layout>
);
export default LoginPage;
