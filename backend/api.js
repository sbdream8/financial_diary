import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../backend/graphql/typeDefs"; // Import type definitions
import resolvers from "../../backend/graphql/resolvers"; // Import resolvers
import dbConnect from "../../backend/utils/dbConnect"; // MongoDB connection utility

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Check for Authorization header to extract JWT token
    const token = req.headers.authorization || "";
    let user = null;
    if (token) {
      try {
        const jwt = require("jsonwebtoken");
        user = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    return { user };
  },
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await dbConnect(); // Ensure MongoDB is connected
  await startServer;
  return apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle GraphQL requests
  },
};
