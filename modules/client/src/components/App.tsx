import React from 'react';
import {Layout, Spin} from 'antd';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {GET_CATEGORIES, CREATE_CATEGORY} from '../queries';
import AppMainView from './App.mainView';
import '../styles/App.css';

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
    <AppMainView data={data} handleAddSubmit={handleAddSubmit} />
  );
}

export default App;
