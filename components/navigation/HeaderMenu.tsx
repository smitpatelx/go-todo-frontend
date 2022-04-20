import { Popover, Transition } from '@headlessui/react';
import { mdiHome, mdiLogout, mdiViewDashboard } from '@mdi/js';
import classNames from 'classnames';
import SpxImage from '@/components/generic/SpxImage';
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
      {({ open }) => (
        <>
          <Popover.Button
            className='pointer-events-auto'
          >
            <div
              className='rounded-full bg-slate-50 shadow-lg overflow-hidden
              h-9 w-9 pointer-events-none'
            >
              <SpxImage
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
            className={classNames(
              'absolute bottom-0 transform shadow-lg',
              maxWidthClass,
              {
                'left-0': !left,
                'right-0': left,
              },
            )}
            enter='transition ease-out duration-200'
            entered='opacity-100 translate-y-full'
            enterFrom='opacity-0 translate-y-1/2'
            enterTo='opacity-100 translate-y-full'
            leave='transition ease-in duration-200'
            leaveFrom='opacity-100 translate-y-full'
            leaveTo='opacity-0 translate-y-1/2'
            show={open}
          >
            <div className='w-full'>
              <div className='overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='relative flex flex-col gap-8 bg-slate-900 p-7 items-stretch'>
                  {solutions.map((item) => {
                    if (item.as === 'a') {
                      return (
                        <DLink
                          key={item.name}
                          className='flex flex-row items-center justify-start p-2 -m-3 transition duration-150 ease-in-out rounded-lg
                            hover:bg-slate-700 focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-50
                            text-slate-50'
                          href={item.href || ''}
                          size=''
                          theme=''
                        >
                          <DIcon className='w-6 h-6 text-sky-500' icon={item.icon} />
                          <div className='ml-4'>
                            <p className='text-sm font-medium'>
                              {item.name}
                            </p>
                          </div>
                        </DLink>
                      );
                    }
                    return (
                      <DButton
                        key={item.name}
                        className='flex flex-row items-center justify-start p-2 -m-3 transition duration-150 ease-in-out rounded-lg
                        hover:bg-slate-700 focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-50
                        text-slate-50'
                        onClick={item.onClick}
                        size=''
                        theme=''
                      >
                        <DIcon className='w-6 h-6 text-sky-500' icon={item.icon} />
                        <div className='ml-4'>
                          <p className='text-sm font-medium '>
                            {item.name}
                          </p>
                        </div>
                      </DButton>
                    );
                  })}
                </div>
                <div className='p-4 bg-slate-800'>
                  <a
                    className='flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-50'
                    href='https://smitpatelx.com'
                    rel='noreferrer'
                    target='_blank'
                  >
                    <span className='flex items-center'>
                      <span className='text-sm font-medium text-gray-100'>
                        Author
                      </span>
                    </span>
                    <span className='block text-sm text-gray-300'>
                      Smit - smitpatelx.com
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </Transition>
        </>
      )}
    </Popover>
  );
};

HeaderMenu.defaultProps = defaultProps;

export default HeaderMenu;
