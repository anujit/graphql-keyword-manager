import React from 'react';
import gql from 'graphql-tag';
import {Layout} from 'antd';
import { useQuery } from '@apollo/react-hooks';
import KeywordsTable from './KeywordsTable';
import {AddCategoryWrapper} from './AddCategory';
import {AddKeywordWrapper} from './AddKeyword';

const {Content} = Layout;

const GET_KEYWORDS_BY_CATEGORY = gql`
  query GetKeywords ($category: String!) {
    keywords(category: $category) {
      word,
      score
    }
  }
`;

// const ADD_KEYWORD = gql`

// `;

// const DELETE_KEYWORD = gql`

// `;

// const DELETE_CATEGORY = gql`

// `;

const App: React.FC<{}> = (props) => {
  const {loading, error, data} = useQuery(GET_KEYWORDS_BY_CATEGORY, {
    variables: { category: 'bikes' },
  });

  console.log(loading, error, data);

  if(loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error in loading the keywords...</div>
  }

  const {keywords = []} = data;
  // const getKeywords = ():[] => [];
  // let keywords = getKeywords();
  // const handleAddCategory = async (values: any) => {
  //   console.log(values);
  //   const {category} = values;
  //   const {loading, error, data} = useQuery(GET_KEYWORDS_BY_CATEGORY, {
  //     variables: { category: 'bikes' },
  //   });    
  //   console.log(data);
  //   keywords = data;
  //   return null;
  // }

  const handleAddSubmit = async (values: any) => {
    console.log(values);
    return null;
  }

  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Content>
        <KeywordsTable keywords={keywords} />
      </Content>
      <Content>
        <AddCategoryWrapper submit={handleAddCategory} />
        <AddKeywordWrapper submit={handleAddSubmit} />      
      </Content>      
    </Layout>
  );
}

export default App;
