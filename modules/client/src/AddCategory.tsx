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
    const {values, handleSubmit, handleChange} = props;
    return (
        <form onSubmit={handleSubmit} className="add-details-form">
            <div>
                <Form className="add-category-form">
                    <Form.Item>
                            <Input
                                name="category"
                                placeholder="Category"
                                onChange={handleChange}
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
