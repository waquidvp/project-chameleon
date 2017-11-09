import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
    type User {
        _id: ID!,
        userName: String!,
        phoneNumber: Int!
    }

    type Query {
        users: [User]!
    }

    type Mutation {
        createUser(userName: String!, phoneNumber: Int!): User
    }
`;

export default makeExecutableSchema({ typeDefs, resolvers });
