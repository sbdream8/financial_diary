import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import dbConnect from "./utils/dbConnect";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return { user };
      } catch {
        throw new Error("Invalid token");
      }
    }
    return {};
  },
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await dbConnect();
  await startServer;
  return apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
