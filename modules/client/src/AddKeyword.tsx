import React from 'react';
import { Form, Input, Button } from 'antd';
import {withFormik, FormikErrors, FormikProps} from 'formik';

interface FormValues {
    keyword: string
    category: string
}

interface Props {
    submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>,
    category: string
}

const AddKeyword: React.FC<FormikProps<FormValues> & Props> = (props) => {
    const {values, handleSubmit, errors} = props;
    console.log(values);
    return (
        <form onSubmit={handleSubmit} className="add-details-form">
            <div style={{width: 400}}>
                <Form className="add-category-form">
                    <Form.Item>
                            <Input
                                name="keyword"
                                placeholder="Keyword"
                                value={values.keyword}
                            />
                    </Form.Item>
                    <Form.Item>
                            <Input
                                name="category"
                                type="password"
                                placeholder="Category"
                                value={values.category}
                            />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Keyword
                        </Button>
                    </Form.Item>                    
                </Form>
            </div>
        </form>
    );
}

export const AddKeywordWrapper = withFormik<Props, FormValues>({
    mapPropsToValues: (props) => ({keyword: "", category: props.category}),
    handleSubmit: async (values, {props, setErrors}) => {
        const errors = await props.submit(values);
        if(errors) {
            setErrors(errors);
        }
    }    
})(AddKeyword);

export default AddKeyword;
