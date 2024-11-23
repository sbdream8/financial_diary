const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Ledger {
    id: ID!
    userId: ID!
    date: String!
    category: String!
    amount: Float!
    description: String
  }

  type Query {
    getUser: User
    getLedgers: [Ledger]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): String
    loginUser(email: String!, password: String!): String
    createLedger(date: String!, category: String!, amount: Float!, description: String): Ledger
    updateLedger(id: ID!, date: String, category: String, amount: Float, description: String): Ledger
    deleteLedger(id: ID!): Boolean
    updateUser(name: String, email: String, password: String): User
  }
`;

module.exports = typeDefs;
