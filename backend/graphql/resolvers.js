import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Ledger from "../models/Ledger";

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await User.findById(user.id);
    },
    ledgers: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await Ledger.find({ userId: user.id });
    },
  },
  Mutation: {
    register: async (_, { username, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      return "User registered successfully";
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error("Invalid credentials");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");
      return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    },
    addLedger: async (_, { title, amount }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const ledger = new Ledger({ userId: user.id, title, amount });
      return await ledger.save();
    },
    updateUser: async (_, { username, password }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const hashedPassword = await bcrypt.hash(password, 10);
      return await User.findByIdAndUpdate(user.id, { username, password: hashedPassword }, { new: true });
    },
  },
};

export default resolvers;
