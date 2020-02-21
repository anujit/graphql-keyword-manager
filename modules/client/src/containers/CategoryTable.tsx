import React, {useState} from 'react';
import {Modal} from 'antd';
import { useMutation } from '@apollo/react-hooks';
import {GET_CATEGORIES} from '../queries';
import {DELETE_CATEGORY, DELETE_KEYWORD, ADD_KEYWORD} from '../mutations';
import CategoryTableView from '../components/CategoryTableView';
import 'antd/dist/antd.css';

const {confirm} = Modal;

interface KeywordsTableProps {
    categories: Array<Category>;
}

type Keyword = {
    id: string;
    word: string;
    score: number;
};

type Category = {
    name: string;
    id: string;
    keywords: Array<Keyword>;
};

const CategoryTable: React.FC<KeywordsTableProps> = (props) => {
    const {categories} = props;

    const [isVisible, setIsVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

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
                  categories: categories.filter((category: Category) => category.id !== deleteCategory.id)
                },
            });
          }
    });

    const [addKeyword] = useMutation(ADD_KEYWORD, {
        refetchQueries: ['GetCategories']        
    })


    const showConfirmKeyword = (keyword: Keyword, category: Category) => {
        confirm({
            title: `Do you want to delete the keyword '${keyword.word}'?`,
            onOk() {
                deleteKeyword({
                    variables: {
                        keywordId: keyword.id
                    }
                });
            }
        });        
    }
        
    const showConfirmCategory = (category: Category) => {
        confirm({
            title: `Do you want to delete the category '${category.name}'?`,
            onOk() {
                deleteCategory({
                    variables: {
                        categoryId: category.id
                    }
                });
            }
        }); 
    }
    
    const showAddKeywordModal = (category: Category) => {
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
        <CategoryTableView 
            categories={categories}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            selectedCategory={selectedCategory}
            showConfirmKeyword={showConfirmKeyword}
            showConfirmCategory={showConfirmCategory}
            showAddKeywordModal={showAddKeywordModal}
            onSubmitKeyword={onSubmitKeyword}/>
    )
}

export default CategoryTable;
