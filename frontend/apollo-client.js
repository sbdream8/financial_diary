import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000', // Update this with your backend server URL
  cache: new InMemoryCache(),
});

export default client;
