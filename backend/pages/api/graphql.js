import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../graphql/typeDefs";
import resolvers from "../../graphql/resolvers";
import dbConnect from "../../utils/dbConnect";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    let user = null;
    if (token) {
      try {
        const jwt = require("jsonwebtoken");
        user = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
      } catch {
        throw new Error("Invalid token");
      }
    }
    return { user };
  },
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await dbConnect();
  await startServer;
  return apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = {
  api: { bodyParser: false },
};
