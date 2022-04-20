import { useMutation } from 'react-query';
import AuthApi from '@/api/auth';
import { NextRouter } from 'next/router';
import { userLogout } from '@/store/slices/authSlice';
import { Dispatch } from 'react';

const useLogout = (router: NextRouter, dispatch: Dispatch<unknown>) => useMutation(
  async () => {
    const res = await AuthApi.postLogout();
    return res;
  },
  {
    onSettled: async () => {
      dispatch(userLogout());
      if (router.asPath === '/dashboard/') {
        await router.push('/login/');
      }
      return null;
    },
  },
);

export default useLogout;
