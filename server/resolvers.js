const message = {
  message: 'Hello World',
};

const resolvers = {
  Query: {
    hello: () => message,
  },
};

export default resolvers;
