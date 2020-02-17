import React, {useState, useEffect} from 'react';
import { Table, Divider } from 'antd';
import 'antd/dist/antd.css';

interface IKeywordsTableProps {
    keywords: []
}

const KeywordsTable: React.FC<IKeywordsTableProps> = (props) => {
    const {keywords: keywordsByCategory = []} = props;
    const [keywords, setKeywords] = useState(keywordsByCategory);
    console.log(keywords);
    useEffect(() => {
        setKeywords(props.keywords);
    },[props.keywords]);

    const columns = [{
        title: 'Keyword',
        dataIndex: 'word',
        key: 'word',
        render : (text: String) => <p>{text}</p>
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (category: String) => <p>{category}</p>
    },
    {
        title: 'Score',
        dataIndex: 'score',
        render: (score: Number) => <p>{score}</p>
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => (
          <span>
            <a>Delete {record.word}</a>
            <Divider type="vertical" />
            <a>Delete {record.category}</a>
          </span>
        ),
      }]
    return <Table columns={columns} dataSource={keywords} />
}

export default KeywordsTable;
