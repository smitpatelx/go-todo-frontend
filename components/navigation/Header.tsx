import { FunctionComponent } from 'react';
import DLink from '@/components/generic/DLink';
import Image from 'next/image';
import useAuth from '@/lib/useAuth';
import User from '@/interface/user';
import { StoreStateType } from '@/store/store';
import { useSelector } from 'react-redux';
import { isEmptyObj } from '@/lib/misc';

const Header: FunctionComponent = () => {
  useAuth();
  const user = useSelector<StoreStateType, User>((state) => state.auth.user);
  return (
    <div className='w-full bg-slate-800 bg-opacity-10 backdrop-blur-lg'>
      <div className='w-full container mx-auto flex flex-wrap items-center justify-between px-4 md:px-0'>
        <div>
          <DLink href='/' title='Home'>
            <Image
              height={60}
              src='/images/blue-logo-transparent.svg'
              width={80}
            />
          </DLink>
        </div>
        <div className='flex flex-wrap gap-x-3 items-center justify-center'>
          {
          isEmptyObj(user) && (
          <DLink
            activeClass={{
              active: 'bg-slate-50 bg-opacity-10',
              inactive: '',
            }}
            className='px-3 py-0.5 rounded-lg text-slate-50 font-medium
              focus:bg-slate-900 focus:bg-opacity-20'
            href='/login'
            size=''
            theme=''
            title='Login'
          >
            Login
          </DLink>
          )
        }
          {
          !isEmptyObj(user) && (
            <>
              <DLink
                activeClass={{
                  active: 'bg-slate-50 bg-opacity-10',
                  inactive: '',
                }}
                className='px-3 py-0.5 rounded-lg text-slate-50 font-medium
                focus:bg-slate-900 focus:bg-opacity-20'
                href='/dashboard/'
                size=''
                theme=''
                title='Dashboard'
              >
                Dashboard
              </DLink>
              { user.avatarUrl && (
              <Image
                className='rounded-full bg-slate-50 shadow-lg'
                height={45}
                src={user.avatarUrl}
                width={45}
              />
              )}
            </>
          )
        }
        </div>
      </div>
    </div>
  );
};

export default Header;
