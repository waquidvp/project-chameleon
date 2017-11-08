import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
    type User {
        userName: String!,
        phoneNumber: Int!
    }

    type Query {
        users: [User]!
    }
`;

export default makeExecutableSchema({ typeDefs, resolvers });
