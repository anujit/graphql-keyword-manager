import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id,
      name,
      keywords{
        id,
        word,
        score
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $categoryName: String!
  ){
    createCategory(name: $categoryName) {
      id,
      name
      keywords {
        id,
        word,
        score
      }      
    }
  }
`;

export const DELETE_KEYWORD = gql`
    mutation DeleteKeyword($keywordId: ID!) {
        deleteKeyword(keywordId: $keywordId){
            id,
            word
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation DeleteCategory($categoryId: ID!) {
        deleteCategory(categoryId: $categoryId) {
            id,
            name
        }
    }
`;

export const ADD_KEYWORD = gql`
    mutation CreateKeyword($name: String!, $categoryId: ID!) {
        createKeyword(name: $name, categoryId: $categoryId) {
            id,
            word
        }
    }
`;