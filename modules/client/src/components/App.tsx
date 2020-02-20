import React from 'react';
import gql from 'graphql-tag';
import {Layout, Spin} from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { graphql } from '@apollo/react-hoc';
import {compose} from 'recompose';
import CategoryTable from './CategoryTable';
import {AddCategoryWrapper} from './AddCategory';
import '../styles/App.css';

const {Header, Content} = Layout;

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

const CREATE_CATEGORY = gql`
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

const withQuery = graphql(gql`
query GetCategories {
  categories{
    id,
    name,
    keywords{
      id,
      word,
      score
    }
  }
}`, {
  name: 'comp1'
})

const withMutation = graphql(gql`
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
}`, {
  name: 'comp2'
});

const App: React.FC<any> = (props) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    update(cache, {
      data: {createCategory}
    }) {
      const {categories} = cache.readQuery<any, any>({query: GET_CATEGORIES});
      cache.writeQuery({
        query: GET_CATEGORIES,
        data: {categories: categories.concat([createCategory])}
      });
    }
  });

  const handleAddSubmit = async (values: any) => {
    createCategory({
      variables: {
        categoryName: values.category
      }
    })
    return null;
}  

  if (loading) {
    return (
      <Layout className="main-wrapper">
        <div className="spin-center">
          <Spin />
        </div>
      </Layout>
    );    
  }

  if (error) return <p>Error in Loading Categories...</p>;

  return (
    <Layout className="main-wrapper">
      <Header className="main-header">Keyword Manager</Header>
      <Content>
        <CategoryTable categories={data.categories} />
      </Content>
      <Content className="form-wrapper">
        <AddCategoryWrapper submit={handleAddSubmit} />
      </Content>      
    </Layout>
  );
}

export default App;

// export default compose(
//   withMutation,
//   withQuery
// )(App);
