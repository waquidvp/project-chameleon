import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const typeDefs = `
    type User {
        _id: ID!
        email: String!
        userName: String
        firstName: String
        lastName: String

        jwt: String
    }

    type Query {
        user(_id: ID!): User
        currentUser: User
        userNameTaken(userName: String!): Boolean!
    }

    type Mutation {
        signup(email: String!, password: String!): User
        login(email: String!, password: String!): User
        loginfb(fbAccessToken: String!): User
        register(userName: String!, firstName: String!, lastName: String!): User
    }
`;

export default makeExecutableSchema({ typeDefs, resolvers });
