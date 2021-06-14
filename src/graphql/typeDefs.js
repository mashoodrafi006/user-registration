import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type User {
        id: ID!
        userName: String!
        token: String!
    }

    type Apartment {
        name: String!
        city: String!
        country: String!
        rooms: Int!
        location: [Float!]
    }

    type isApartmentSaved {
        isApartmentSaved: Boolean!
    }

    type Query {
        login(userName: String!, password: String!): User!
        findUserFavoriteApartments(userId: String!): [Apartment]!
        searchApartments(city: String, country: String, rooms: Int, latitude: Float, longitude: Float, minDistance: Int, maxDistance: Int, offset: Int!, limit: Int!): [Apartment]!
    }

    type Mutation {
        register(userName: String!, password: String!, email: String!): User!
        createApartment(name: String!, city: String!, country: String!, rooms: Int!, latitude: Float!, longitude: Float!): Apartment
        saveUserApartment(userId: String!, apartmentId: String!): isApartmentSaved!
        markUserFavoriteApartment(userId: String!, apartmentId: String!, isFavorite: Boolean!): isApartmentSaved!
    }
`;
