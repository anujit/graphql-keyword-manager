import React from 'react';
import {Layout, Alert, Row, Col} from 'antd';
import CategoryTable from './CategoryTable';
import {AddCategoryWrapper} from './AddCategory';

const {Header, Content} = Layout;

const AppMainView: React.FC<any> = (props) => {
    const {data, handleAddSubmit} = props;

    return (
        <Layout className="main-wrapper">
            <Header className="main-header">Keyword Manager</Header>
            <Row style={{padding:'10px'}}>
                <Col span={8}>
                <Alert showIcon message="Click on a keyword below to delete it" type="info" />
                </Col>
            </Row>
            <Content>
                <CategoryTable categories={data.categories} />
            </Content>
            <Content className="form-wrapper">
                <AddCategoryWrapper submit={handleAddSubmit} />
            </Content>      
        </Layout>
    )
}


export default AppMainView;
