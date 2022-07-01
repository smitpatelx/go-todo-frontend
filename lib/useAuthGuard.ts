/* eslint-disable @typescript-eslint/no-floating-promises */
import AuthApi from '@/api/auth';
import { setUser } from '@/store/slices/authSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import useLogout from './logout';
import useAuth from './useAuth';

const GUEST_ROUTES = [
  '/',
  '/login/',
  '/test/',
];

const useAuthGuard = () => {
  const { authorized } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const logOut = useLogout(router, dispatch);

  const getUser = useMutation(
    async () => {
      const res = await AuthApi.getUser();
      return res;
    },
    {
      onSuccess: ({ user }) => {
        dispatch(setUser({ user }));
      },
      onError: () => {
        logOut.mutate();
      },
    },
  );

  useEffect(() => {
    if (authorized) return;
    getUser.mutate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isGuestRequired = GUEST_ROUTES.some((routePath) => routePath === router.asPath);
    // When user is authorized
    if (authorized && isGuestRequired && router.asPath !== '/dashboard/') {
      router.push('/dashboard/');
    } else if (!authorized && !isGuestRequired && router.asPath !== '/login/') {
      router.push('/login/');
    }
  });
};

export default useAuthGuard;
