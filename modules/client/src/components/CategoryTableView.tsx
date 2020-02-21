import React, {useState} from 'react';
import { Table, Tag, Modal, Divider } from 'antd';
import AddKeywordView from './AddKeywordView';

const {confirm} = Modal;

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

const CategoryTableView: React.FC<ICategoryTableViewProps> = (props) => {
    const {deleteCategory, deleteKeyword, categories, addKeyword} = props;
    const [isVisible, setIsVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

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
    const showConfirmKeyword = (keyword: Keyword, category: Category) => {
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
    
    const showAddKeywordModal = (category : Category) => {
        setSelectedCategory(category);
        setIsVisible(!isVisible);
    }

    const onSubmitKeyword = async (values: any) => {
        addKeyword({
            variables: {
                name: values.keyword,
                categoryId: selectedCategory.id
            }
        });
        setIsVisible(false);
        return null;
    }

    return (
        <>
            <Table rowKey="id" columns={columns} dataSource={categories} />
            <Modal
                title="Add Keyword"
                visible={isVisible}
                footer={null}
                onCancel={() => setIsVisible(false)}>
                    <AddKeywordView
                        add={onSubmitKeyword}
                        category={selectedCategory}
                    />
            </Modal>
        </>
    )
}

export default CategoryTableView;