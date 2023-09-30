import { ChakraProvider } from '@chakra-ui/react';
import { ReactElement } from 'react';
import theme from '../theme/theme';
import ApolloClientProvider from './apollo.provider';

type AppProviderProps = {
  children: ReactElement;
};

function AppProvider({ children }: AppProviderProps) {
  return (
    <ApolloClientProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ApolloClientProvider>
  );
}

export default AppProvider;
