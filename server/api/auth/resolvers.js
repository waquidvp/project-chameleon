import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import JWT_SECRET from '../../config';

const resolvers = {
  Query: {
    // user(_id: ID!): User
    user: async (root, data, context) => {
      const { Users } = context.db;

      const response = await Users.findOne({ userName: data.userName });

      return response;
    },
    // currentUser: User
    currentUser: async (root, data, context) => {
      const { user } = context;

      return user;
    },
    // userNameTaken(userName: String!): Boolean!
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
    // signup(email: String!, password: String!): User
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
    // login(email: String!, password: String!): User
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
    // loginfb(fbAccessToken: String!): User
    loginfb: async (root, data, context) => {
      const { fbAccessToken } = data;
      const { Users } = context.db;

      let fbResponse;

      console.log(fbAccessToken);

      await axios.get('https://graph.facebook.com/me?fields=email', {
        params: {
          access_token: fbAccessToken,
        },
      })
        .then((response) => {
          fbResponse = response;
        });

      const { email } = fbResponse.data;

      let user = await Users.findOne({ email });

      console.log(user);

      if (user) {
        user.jwt = await jwt.sign({ _id: user._id }, JWT_SECRET);
        return user;
      }

      const newUser = {
        email,
      };

      await Users.insertOne(newUser);

      user = await Users.findOne({ email });
      user.jwt = await jwt.sign({ _id: user._id }, JWT_SECRET);

      console.log(user);

      return user;
    },
  },
};

export default resolvers;
