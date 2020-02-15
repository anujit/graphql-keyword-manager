const {gql} = require('apollo-server');

const typeDefs = gql`
    type Category {
        id: ID!
        name: String
        keywords: [Keyword]
    }

    type Keyword {
        id: ID!
        word: String
        score: Int
        category: String
    }

    type Query {
        categories: [Category]!
        keywords(category: String!): [Keyword]!
    }
`;

module.exports = typeDefs;