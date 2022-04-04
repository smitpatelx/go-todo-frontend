import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '@/store/store';
import { Provider } from 'react-redux';
import style from '../styles/Home.module.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <div className={classNames(style.bgImage, 'h-full')}>
        <div className='flex flex-wrap flex-col h-full'>
          <AnimatePresence
            exitBeforeEnter
            initial={false}
          >
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </AnimatePresence>
        </div>
      </div>
    </QueryClientProvider>
  </Provider>
);

export default MyApp;
