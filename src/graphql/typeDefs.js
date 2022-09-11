import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type User {
        id: ID!
        userName: String!
        token: String!
    }

    type Query {
        login(userName: String!, password: String!): User!
    }

    type Mutation {
        register(userName: String!, password: String!, email: String!): User!
    }
`;
