const resolvers = require('./resolvers');
const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('../generated/prisma-client/');

const TYPE_DEFS_PATH = './schema.graphql';

const server = new GraphQLServer({
    typeDefs: TYPE_DEFS_PATH,
    resolvers,
    context: request => ({
        ...request,
        prisma
    }),
  })

server.start({port: 4001}, ({port}) => console.log(`Server running on port ${port}`));