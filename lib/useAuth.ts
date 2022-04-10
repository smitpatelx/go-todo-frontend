import AuthApi from '@/api/auth';
import User from '@/interface/user';
import { setUser, userLogout } from '@/store/slices/authSlice';
import { StoreStateType } from '@/store/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { isEmptyObj } from './misc';
import routes from './routes';

const useAuth = () => {
  const userFromStore = useSelector<StoreStateType, User>((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const checkStatus = useMutation(
    async () => {
      const res = await AuthApi.getUser();
      return res;
    },
    {
      onSuccess: ({ user }) => {
        dispatch(setUser({ user }));
      },
      onError: async () => {
        dispatch(userLogout());
        if (router.pathname === '/login') return;
        await router.push('/login/');
      },
    },
  );

  const handleUrlAuth = (url: string) => {
    const currentRoute = routes.find((x) => x.pathname === url);
    console.log(currentRoute);

    if (!currentRoute?.auth || currentRoute?.auth === '') return;

    switch (currentRoute.auth) {
      case 'LoggedOutOnly':
        if (!isEmptyObj(userFromStore)) {
          // eslint-disable-next-line no-void
          void router.push('/dashboard/');
        }
        break;
      case 'LoggedInOnly':
        if (isEmptyObj(userFromStore)) {
          // eslint-disable-next-line no-void
          void router.push('/login/');
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      handleUrlAuth(url);
    };

    // eslint-disable-next-line no-void
    void checkStatus.mutateAsync();
    handleUrlAuth(router.asPath);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useAuth;
