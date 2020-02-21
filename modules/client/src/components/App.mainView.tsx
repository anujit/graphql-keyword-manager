import React from 'react';
import {Layout, Alert, Row, Col} from 'antd';
import CategoryTable from '../containers/CategoryTable';
import {AddCategoryWrapper} from './AddCategory';

const {Header, Content} = Layout;

interface IAppMainViewProps {
    data: any
    handleAddSubmit: (values: any) => any
    categoryLoading: boolean
}

const AppMainView: React.FC<IAppMainViewProps> = (props) => {
    const {data, handleAddSubmit, categoryLoading} = props;

    return (
        <Layout className="main-wrapper">
            <Header className="main-header">Keyword Manager</Header>
            <Row style={{padding:'10px'}}>
                <Col span={8}>
                    <Alert showIcon message="Click on a keyword below to delete it" type="info" />
                </Col>
            </Row>
            <Content>
                {categoryLoading && (
                <Row style={{padding:'10px'}}>
                    <Col span={8}>
                        <Alert showIcon message="Creating a new category..." type="info" />
                    </Col>
                </Row>
                )}
                <CategoryTable categories={data.categories} />
            </Content>
            <Content className="form-wrapper">
                <AddCategoryWrapper submit={handleAddSubmit} />
            </Content>      
        </Layout>
    )
}


export default AppMainView;
