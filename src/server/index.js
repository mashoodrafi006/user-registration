import config from '../config/config';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';
import logger  from '../utils/logger';

const app = require('./expressApp');

const server = require('http').Server(app);
require('./routes');

try {
    const gqlServer = new ApolloServer({ typeDefs, resolvers });
    gqlServer.applyMiddleware({ app });
} catch (error) {
    console.log(error);
    logger.log({
        level: 'error',
        message: error.message,
    });
}

app.listen({ port: config.gqlPort }, () => {
    console.log(`Apollo server at http://localhost:${config.gqlPort}/graphql`);
});

module.exports = server;
