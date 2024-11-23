const User = require('./models/User');
const Ledger = require('./models/Ledger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    getUser: async (_, __, { user }) => {
      if (!user) throw new Error('Authentication required');
      return User.findById(user.id);
    },
    getLedgers: async (_, __, { user }) => {
      if (!user) throw new Error('Authentication required');
      return Ledger.find({ userId: user.id });
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      const user = new User({ name, email, password });
      await user.save();
      return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    },
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password)))
        throw new Error('Invalid credentials');
      return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    },
    createLedger: async (_, args, { user }) => {
      if (!user) throw new Error('Authentication required');
      const ledger = new Ledger({ ...args, userId: user.id });
      await ledger.save();
      return ledger;
    },
    updateLedger: async (_, { id, ...args }, { user }) => {
      if (!user) throw new Error('Authentication required');
      const ledger = await Ledger.findOneAndUpdate({ _id: id, userId: user.id }, args, { new: true });
      if (!ledger) throw new Error('Ledger not found');
      return ledger;
    },
    deleteLedger: async (_, { id }, { user }) => {
      if (!user) throw new Error('Authentication required');
      const result = await Ledger.findOneAndDelete({ _id: id, userId: user.id });
      return !!result;
    },
    updateUser: async (_, { name, email, password }, { user }) => {
      if (!user) throw new Error('Authentication required');
      const updates = { name, email };
      if (password) updates.password = await bcrypt.hash(password, 10);
      const updatedUser = await User.findByIdAndUpdate(user.id, updates, { new: true });
      return updatedUser;
    },
  },
};

module.exports = resolvers;
