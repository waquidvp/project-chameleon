const resolvers = {
  Query: {
    users: async (root, data, { db: { Users } }) => {
      const response = await Users.find({}).toArray();
      return response;
    },
  },
  Mutation: {
    createUser: async (root, data, { db: { Users } }) => {
      const response = await Users.insert(data);
      return Object.assign({ _id: response.insertedIds[0] }, data);
    },
  },
};

export default resolvers;
