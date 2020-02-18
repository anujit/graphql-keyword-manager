const {gql} = require('apollo-server');

const typeDefs = gql`
    type Category {
        name: String
        keywords: [Keyword]
    }

    type Keyword {
        word: String
        score: Int
    }

    type DeleteCategoryResponse {
        success: Boolean!
        name: String
    }

    type Query {
        category(categoryName: String): Category
        keywords(category: String!): [Keyword]!
    }

    type Mutation {
        deleteKeyword(keyword: String!) : Boolean
        deleteCategory(categoryName: String!) : DeleteCategoryResponse
    }
`;

module.exports = typeDefs;