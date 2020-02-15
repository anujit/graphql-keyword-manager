const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const {createStore} = require('./store');

const KeywordsAPI = require('./datasources/keywords');

const store = createStore();

const dataSources = () => ({
    keywordsApi: new KeywordsAPI({store})
})

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    dataSources
});

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
})