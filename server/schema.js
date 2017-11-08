import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
    type Hello {
        message: String!
    }

    type Query {
        hello: Hello!
    }
`;

export default makeExecutableSchema({ typeDefs, resolvers });
