const app = require('./expressApp');
import { ApolloServer, gql } from 'apollo-server-express';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';

require('./routes');
const server = require('http').Server(app);

try {
    const gqlServer = new ApolloServer({ typeDefs, resolvers });
    gqlServer.applyMiddleware({ app });
} catch (error) {
    console.log(error);
}

app.listen({ port: 5000 }, () => {
    console.log(`Apollo server at http://localhost:5000/graphql`);
});

module.exports = server;
