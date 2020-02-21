import React from 'react';
import { Table, Tag, Modal, Divider } from 'antd';
import AddKeywordView from './AddKeywordView';

type Category = {
    name: String,
    id: String,
    keywords: Array<Keyword>
};

type Keyword = {
    id: string,
    word: string,
    score: Number
};

interface ICategoryTableViewProps {
    deleteCategory: (arg: any) => any
    deleteKeyword: (arg: any) => any
    addKeyword: (arg: any) => any
    categories: Array<Category>
}

const CategoryTableView: React.FC<any> = (props) => {
    const {
        showConfirmKeyword, 
        showConfirmCategory, 
        showAddKeywordModal, 
        onSubmitKeyword, 
        categories
    } = props;

    const columns = [
        {
            title: 'Category',
            dataIndex: 'name',
            key: 'name',
            render: (name: String) => <p>{name}</p>
        },        
        {
        title: 'Keywords',
        dataIndex: 'keywords',
        key: 'keywords',
        render: (keywords: Array<Keyword>, record: Category) => (
            <p>
                {
                    keywords.map(keyword => {
                        return <Tag key={keyword.id} className="keyword-tag" onClick={() => showConfirmKeyword(keyword, record)}>{keyword.word}</Tag>;
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
                    <a onClick={() => showAddKeywordModal(record)}>Add Keyword</a>
                        <Divider type="vertical" />
                    <a onClick={() => showConfirmCategory(record)}>Delete Category</a>
                </span>
        ),}
    ];

    return (
        <>
            <Table rowKey="id" columns={columns} dataSource={categories} />
            <Modal
                title="Add Keyword"
                visible={props.isVisible}
                footer={null}
                onCancel={() => props.setIsVisible(false)}>
                    <AddKeywordView
                        add={onSubmitKeyword}
                        category={props.selectedCategory}
                    />
            </Modal>
        </>
    )
}

export default CategoryTableView;