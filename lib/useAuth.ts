/* eslint-disable @typescript-eslint/no-floating-promises */
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

  const handleLouOutCallback = () => {
    dispatch(userLogout());
    if (router.asPath === '/dashboard/') { return router.push('/login/'); }
    return undefined;
  };

  const logOut = useMutation(
    async () => {
      const res = await AuthApi.postLogout();
      return res;
    },
    {
      onSettled: async () => handleLouOutCallback(),
    },
  );

  const handleUrlAuth = (url: string, userX = userFromStore) => {
    const currentRoute = routes.find((x) => x.pathname === url);
    if (!currentRoute?.auth || currentRoute?.auth === '') return;

    if (currentRoute.auth === 'LoggedOutOnly' && !isEmptyObj(userX)) {
      router.push('/dashboard/');
      return;
    }
    if (currentRoute.auth === 'LoggedInOnly' && isEmptyObj(userX)) {
      router.push('/login/');
    }
  };

  const getUser = useMutation(
    async () => {
      const res = await AuthApi.getUser();
      return res;
    },
    {
      onSuccess: ({ user }) => {
        dispatch(setUser({ user }));
        handleUrlAuth(router.asPath, user);
      },
      onError: () => {
        logOut.mutate();
      },
    },
  );

  useEffect(() => {
    getUser.mutate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      handleUrlAuth(url);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFromStore]);

  return { userFromStore, logOut };
};

export default useAuth;
