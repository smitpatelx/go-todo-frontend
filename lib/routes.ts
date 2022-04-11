export type Route = {
  name: string,
  pathname: string,
  auth: string,
};

const routes: Route[] = [
  {
    name: 'login',
    pathname: '/login/',
    auth: 'LoggedOutOnly',
  },
  {
    name: 'dashboard',
    pathname: '/dashboard/',
    auth: 'LoggedInOnly',
  },
  {
    name: 'home',
    pathname: '/',
    auth: '',
  },
  {
    name: 'test',
    pathname: '/test/',
    auth: '',
  },
];

export default routes;
