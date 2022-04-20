/* eslint-disable @next/next/no-img-element */
import { FunctionComponent, useMemo } from 'react';
import DLink from '@/components/generic/DLink';
import useAuth from '@/lib/useAuth';
import { isEmptyObj } from '@/lib/misc';
import SpxImage from '@/components/generic/SpxImage';
import useLogout from '@/lib/logout';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import DButton from '../generic/DButton';
import HeaderMenu from './HeaderMenu';

const Header: FunctionComponent = () => {
  const { userFromStore } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = useLogout(router, dispatch);

  const avatarUrl = useMemo(() => {
    if (userFromStore?.avatarUrl) {
      return userFromStore.avatarUrl;
    }
    return '';
  }, [userFromStore?.avatarUrl]);

  return (
    <div className='w-full bg-slate-800 bg-opacity-40 backdrop-blur-lg z-50 fixed top-0 left-0'>
      <div className='w-full container mx-auto flex flex-wrap items-center justify-between px-4 md:px-0'>
        <div>
          <DLink href='/' title='Home'>
            <SpxImage
              height={60}
              src='/images/blue-logo-transparent-w.svg'
              width={80}
            />
          </DLink>
        </div>
        <div className='flex flex-wrap gap-x-3 items-center justify-center'>
          {
            isEmptyObj(userFromStore) && (
              <div>
                <DLink
                  activeClass={{
                    active: 'bg-slate-50 bg-opacity-10',
                    inactive: '',
                  }}
                  className='px-3 py-0.5 rounded-lg text-slate-50 font-bold md:font-semibold
                    focus:bg-slate-900 focus:bg-opacity-20'
                  href='/login'
                  size=''
                  theme=''
                  title='Login'
                >
                  Login
                </DLink>
              </div>
            )
          }
          {
          !isEmptyObj(userFromStore) && (
            <div>
              <div className='hidden md:flex'>
                <DLink
                  activeClass={{
                    active: 'bg-slate-50 bg-opacity-10',
                    inactive: '',
                  }}
                  className='px-3 py-0.5 rounded-lg text-slate-50 font-bold md:font-semibold
                  focus:bg-slate-900 focus:bg-opacity-20'
                  href='/dashboard/'
                  size=''
                  theme=''
                  title='Dashboard'
                >
                  Dashboard
                </DLink>
                <DButton
                  className='px-3 py-0.5 rounded-lg text-slate-50 font-bold md:font-semibold
                  focus:bg-slate-900 focus:bg-opacity-20'
                  onClick={() => handleLogout.mutate()}
                  size=''
                  theme=''
                  title='Logout'
                >
                  Logout
                </DButton>
                <div
                  className='rounded-full bg-slate-50 shadow-lg overflow-hidden
                  h-9 w-9'
                >
                  <img
                    alt='User'
                    className='rounded-full bg-slate-50'
                    height={45}
                    src={avatarUrl}
                    width={45}
                  />
                </div>
              </div>
              <div className='flex md:hidden'>
                <HeaderMenu
                  avatarUrl={avatarUrl}
                  left
                  logout={() => handleLogout.mutate()}
                  maxWidthClass='w-screen -mr-4'
                />
              </div>
            </div>
          )
        }
        </div>
      </div>
    </div>
  );
};

export default Header;
