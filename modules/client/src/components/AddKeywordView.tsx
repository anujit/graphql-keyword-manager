import React from 'react';
import { Form, Input, Button, Layout } from 'antd';
import { Category } from './CategoryTable';
import {withFormik, FormikErrors, FormikProps} from 'formik';

const {Content} = Layout;

interface FormValues {
    keyword: string
}

interface Props {
    add: (values: FormValues) => Promise<FormikErrors<FormValues> | null>
    category: Category
}

const AddKeywordView: React.FC<FormikProps<FormValues> & Props> = (props) => {
    const {category} = props;
    const {values, handleSubmit, handleChange} = props;
    return (
        <Content>
            <p>Add keyword for {category.name}</p>
            <form onSubmit={handleSubmit} className="add-details-form">
                <div>
                    <Form.Item>
                            <Input
                                name="keyword"
                                placeholder="Keyword"
                                onChange={handleChange}
                                value={values.keyword}
                            />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Keyword
                        </Button>
                    </Form.Item>
                </div>
            </form>
        </Content>
    );  
}

const AddKeywordWrapper = withFormik<Props, FormValues>({
    mapPropsToValues: () => ({keyword: ""}),
    handleSubmit: async (values, {props, setErrors}) => {
        if(values.keyword.trim() === '') {
            return false;
        }
        const errors = await props.add(values);
        if(errors) {
            setErrors(errors);
        }
    }    
})(AddKeywordView);


export default AddKeywordWrapper;
