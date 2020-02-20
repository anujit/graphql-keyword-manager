import React from 'react';
import { Table, Tag, Modal, Divider } from 'antd';
import gql from 'graphql-tag';
import 'antd/dist/antd.css';
import { useMutation } from '@apollo/react-hooks';
import {GET_CATEGORIES} from './App';

const {confirm} = Modal;

interface IKeywordsTableProps {
    categories: Array<Category>
}

type Keyword = {
    id: String,
    word: String,
    score: Number
};

type Category = {
    name: String,
    id: String,
    keywords: Array<Keyword>
};

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
            console.log(categories, deleteCategory);
            cache.writeQuery({
              query: GET_CATEGORIES,
              data: {
                  categories: categories.filter((category:Category) => category.id !== deleteCategory.id)
                },
            });
          }        
    });

    const columns = [{
            title: 'Category',
            dataIndex: 'name',
            key: 'name',
            render: (name: String) => <p>{name}</p>
        },        
        {
        title: 'Keywords',
        dataIndex: 'keywords',
        key: 'keywords',
        render: (keywords: Array<Keyword>) => (
            <p>
                {
                    keywords.map(keyword => {
                        return <Tag onClick={() => showConfirmKeyword(keyword)}>{keyword.word}</Tag>;
                    })
                }
            </p>
        )
    },
    {
        title: 'Actions',
        key: 'action',
        render: (text: any, record: any) => (
          <span>
            <a>Add Keyword</a>
            <Divider type="vertical" />
            <a onClick={() => showConfirmCategory(record)}>Delete Category</a>
          </span>
        ),
      }];
    
    const showConfirmKeyword = (keyword: Keyword) => {
        confirm({
            title: `Do you want to delete the keyword '${keyword.word}'?`,
            onOk() {
                deleteKeyword({
                    variables: {
                        keywordId: keyword.id
                    }
                });
            },
            onCancel() {},
          });        
    }

    const showConfirmCategory = (category : Category) => {
        confirm({
            title: `Do you want to delete the category '${category.name}'?`,
            onOk() {
                deleteCategory({
                    variables: {
                        categoryId: category.id
                    }
                });
            },
            onCancel() {},
          }); 
    }

    return <Table columns={columns} dataSource={categories} />
}

export default CategoryTable;
