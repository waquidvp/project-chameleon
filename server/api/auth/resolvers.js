const users = [
  {
    userName: 'waquidvp',
    phoneNumber: 447498474961,
  },
];

const resolvers = {
  Query: {
    users: () => users,
  },
};

export default resolvers;
