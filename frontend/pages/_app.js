import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
