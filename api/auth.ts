import axios from '@/lib/axios';
import UserType from '@/interface/user';

const postStatus = async () => axios.post('/auth/status', {}, { withCredentials: true });
const postLogout = async () => axios.post('/auth/logout', {}, { withCredentials: true });
const getUser = async (): Promise<{ user: UserType }> => axios.get('/auth/user', { withCredentials: true });

export default {
  postStatus,
  postLogout,
  getUser,
};
