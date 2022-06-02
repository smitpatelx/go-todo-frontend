import User from '@/interface/user';
import { StoreStateType } from '@/store/store';
import { useSelector } from 'react-redux';
import { isEmptyObj } from './misc';

const useAuth = () => {
  const loggedInUser = useSelector<StoreStateType, User>((state) => state.auth.user);
  const authorized = !isEmptyObj(loggedInUser);

  return { loggedInUser, authorized };
};

export default useAuth;
