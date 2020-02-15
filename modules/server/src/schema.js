const {gql} = require('apollo-server');

const typeDefs = gql`
    type Category {
        name: String
        keywords: [Keyword]
    }

    type Keyword {
        word: String
        score: Int
        category: String
    }

    type Query {
        categories: [Category]!
        keywords(category: String!): [Keyword]!
    }

    type Mutation {
        deleteKeyword(keyword: String!) : Boolean
    }
`;

module.exports = typeDefs;