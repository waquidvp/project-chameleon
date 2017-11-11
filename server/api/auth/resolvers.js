import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import JWT_SECRET from '../../config';

const resolvers = {
  Query: {
    user: async (root, data, context) => {
      const { Users } = context.db;

      const response = await Users.findOne({ userName: data.userName });

      return response;
    },
    currentUser: async (root, data, context) => {
      const { user } = context;

      return user;
    },
    userNameTaken: async (root, data, context) => {
      const { Users } = context.db;

      const response = await Users.findOne({ userName: data.userName });

      if (response !== null) {
        return false;
      }
      return true;
    },
  },
  Mutation: {
    signup: async (root, data, context) => {
      const { Users } = context.db;
      const { email, password } = data;

      const existingUser = await Users.findOne({ email });

      if (existingUser) {
        throw new Error('Email already used');
      }

      const hash = await bcrypt.hash(password, 10);
      const newUser = {
        email,
        password: hash,
      };

      await Users.insertOne(newUser);

      const user = await Users.findOne({ email });

      user.jwt = jwt.sign({ _id: user._id }, JWT_SECRET);

      return user;
    },
    login: async (root, data, context) => {
      const { Users } = context.db;

      const user = await Users.findOne({ email: data.email });

      if (!user) {
        throw new Error('Email not found');
      }

      const validPassword = await bcrypt.compare(data.password, user.password);
      if (!validPassword) {
        throw new Error('Password is incorrect');
      }

      user.jwt = await jwt.sign({ _id: user._id }, JWT_SECRET);

      return user;
    },
  },
};

export default resolvers;
