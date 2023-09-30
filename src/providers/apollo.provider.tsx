import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo-client';

type TApolloClientProvider = {
  children: ReactNode;
};

function ApolloClientProvider({ children }: TApolloClientProvider) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloClientProvider;
