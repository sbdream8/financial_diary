const { ApolloServer } = require('apollo-server');
const cors = require('cors');
const express = require('express');
const app = express();
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

app.use(cors()); // Enable CORS

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app, path: '/graphql' });
  app.listen({ port: 4000 }, () => {
    console.log('Server ready at http://localhost:4000');
  });
});
