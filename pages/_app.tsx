import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import store from '@/store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProviderWrapper from '@/components/generic/ProviderWrapper';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const ComponentX = Component as React.FC;
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ProviderWrapper>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <ComponentX {...pageProps} />
        </ProviderWrapper>
      </QueryClientProvider>
    </Provider>
  );
};

export default MyApp;
