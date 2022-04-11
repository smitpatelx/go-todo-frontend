import { Popover, Transition } from '@headlessui/react';
import { mdiHome, mdiLogout, mdiViewDashboard } from '@mdi/js';
import classNames from 'classnames';
import Image from 'next/image';
import DButton from '../generic/DButton';
import DIcon from '../generic/DIcon';
import DLink from '../generic/DLink';

type HeaderMenuProps = {
  avatarUrl: string,
  logout: () => void,
  maxWidthClass?: string,
  left?: boolean,
};

const defaultProps = {
  maxWidthClass: 'max-w-screen',
  left: false,
};

const HeaderMenu = ({
  avatarUrl,
  logout,
  maxWidthClass,
  left,
}: HeaderMenuProps) => {
  const solutions = [
    {
      name: 'Dashboard',
      href: '/dashboard/',
      icon: mdiViewDashboard,
      as: 'a',
    },
    {
      name: 'Home',
      href: '/',
      icon: mdiHome,
      as: 'a',
    },
    {
      name: 'Logout',
      onClick: () => logout(),
      icon: mdiLogout,
      as: 'button',
    },
  ];
  return (
    <Popover className='relative'>
      <Popover.Button
        className='pointer-events-auto'
      >
        <div
          className='rounded-full bg-slate-50 shadow-lg overflow-hidden
              h-9 w-9 pointer-events-none'
        >
          <Image
            alt='User'
            className='rounded-full bg-slate-50 pointer-events-none'
            height={45}
            layout='responsive'
            src={avatarUrl}
            width={45}
          />
        </div>
      </Popover.Button>
      <Transition
        as='div'
        className={classNames(
          'w-full px-4 absolute bottom-3 shadow-lg',
          maxWidthClass,
          {
            'left-0': left,
            'right-0': !left,
          },
        )}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <div className='absolute z-10 w-full mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl'>
          <div className='overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5'>
            <div className='relative flex flex-col gap-8 bg-white p-7 items-stretch'>
              {solutions.map((item) => {
                if (item.as === 'a') {
                  return (
                    <DLink
                      key={item.name}
                      className='flex flex-row items-center justify-start p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
                      href={item.href || ''}
                      size=''
                      theme=''
                    >
                      <DIcon className='w-6 h-6 text-sky-500' icon={item.icon} />
                      <div className='ml-4'>
                        <p className='text-sm font-medium text-gray-900'>
                          {item.name}
                        </p>
                      </div>
                    </DLink>
                  );
                }
                return (
                  <DButton
                    key={item.name}
                    className='flex flex-row items-center justify-start p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
                    onClick={item.onClick}
                    size=''
                    theme=''
                  >
                    <DIcon className='w-6 h-6 text-sky-500' icon={item.icon} />
                    <div className='ml-4'>
                      <p className='text-sm font-medium text-gray-900'>
                        {item.name}
                      </p>
                    </div>
                  </DButton>
                );
              })}
            </div>
            <div className='p-4 bg-sky-50'>
              <a
                className='flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
                href='https://smitpatelx.com'
                rel='noreferrer'
                target='_blank'
              >
                <span className='flex items-center'>
                  <span className='text-sm font-medium text-gray-900'>
                    Author
                  </span>
                </span>
                <span className='block text-sm text-gray-500'>
                  Smit - smitpatelx.com
                </span>
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Popover>
  );
};

HeaderMenu.defaultProps = defaultProps;

export default HeaderMenu;
