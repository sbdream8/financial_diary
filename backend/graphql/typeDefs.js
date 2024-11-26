import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Ledger {
    id: ID!
    userId: ID!
    title: String!
    amount: Float!
    date: String!
  }

  type Query {
    me: User
    ledgers: [Ledger!]!
  }

  type Mutation {
    register(username: String!, password: String!): String
    login(username: String!, password: String!): String
    addLedger(title: String!, amount: Float!): Ledger
    updateUser(username: String!, password: String!): User
  }
`;

export default typeDefs;
