import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {GET_CATEGORIES, DELETE_CATEGORY, DELETE_KEYWORD, ADD_KEYWORD} from '../queries';
import CategoryTableView from './CategoryTableView';
import 'antd/dist/antd.css';

interface IKeywordsTableProps {
    categories: Array<Category>
}

type Keyword = {
    id: string,
    word: string,
    score: Number
};

type Category = {
    name: String,
    id: String,
    keywords: Array<Keyword>
};

const CategoryTable: React.FC<IKeywordsTableProps> = (props) => {
    const {categories} = props;

    const [deleteKeyword] = useMutation(DELETE_KEYWORD, {
        refetchQueries: ['GetCategories']
    });

    const [deleteCategory] = useMutation(DELETE_CATEGORY, {
        update(cache, {
            data: {deleteCategory}
          }) {
            const {categories} = cache.readQuery<any, any>({query: GET_CATEGORIES});
            cache.writeQuery({
              query: GET_CATEGORIES,
              data: {
                  categories: categories.filter((category:Category) => category.id !== deleteCategory.id)
                },
            });
          }
    });

    const [addKeyword] = useMutation(ADD_KEYWORD, {
        refetchQueries: ['GetCategories']        
    })

    return (
        <CategoryTableView 
            categories={categories}
            addKeyword={addKeyword}
            deleteKeyword={deleteKeyword} 
            deleteCategory={deleteCategory} />
    )
}

export default CategoryTable;
