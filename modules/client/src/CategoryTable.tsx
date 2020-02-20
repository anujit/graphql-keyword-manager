import React from 'react';
import { Table, Tag, Modal, Divider } from 'antd';
import gql from 'graphql-tag';
import 'antd/dist/antd.css';
import { useMutation } from '@apollo/react-hooks';

const {confirm} = Modal;

interface IKeywordsTableProps {
    categories: Array<Category | null>
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


const CategoryTable: React.FC<IKeywordsTableProps> = (props) => {
    const {categories} = props;

    const [deleteKeyword] = useMutation(DELETE_KEYWORD, {
        refetchQueries: ['GetCategories']
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
                        return <Tag onClick={() => showConfirm(keyword)}>{keyword.word}</Tag>;
                    })
                }
            </p>
        )
    },
    {
        title: 'Actions',
        key: 'action',
        render: () => (
          <span>
            <a>Add Keyword</a>
            <Divider type="vertical" />
            <a>Delete Category</a>
          </span>
        ),
      }];
    
    const showConfirm = (keyword: Keyword) => {
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

    return <Table columns={columns} dataSource={categories} />
}

export default CategoryTable;
