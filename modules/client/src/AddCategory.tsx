import React from 'react';
import { Form, Input, Button } from 'antd';
import {withFormik, FormikErrors, FormikProps} from 'formik';

interface FormValues {
    category: string
}

interface Props {
    submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>
}

const AddCategory: React.FC<FormikProps<FormValues> & Props> = (props) => {
    const {values, handleSubmit, errors} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div style={{width: 400}}>
                <Form className="add-category-form">
                    <Form.Item>
                            <Input
                                name="category"
                                placeholder="Category"
                                value={values.category}
                            />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Category
                        </Button>
                    </Form.Item>                    
                </Form>
            </div>
        </form>
    );
}

export const AddCategoryWrapper = withFormik<Props, FormValues>({
    mapPropsToValues: () => ({category: ""}),
    handleSubmit: async (values, {props, setErrors}) => {
        const errors = await props.submit(values);
        if(errors) {
            setErrors(errors);
        }
    }    
})(AddCategory);

export default AddCategory;
