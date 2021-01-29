import React, { useEffect, useState } from "react";
import {
    Table,
    Space,
    Popconfirm, Input,
    Form, Modal,
    Row, Col,
    message, Breadcrumb,
    PageHeader, Card, Button, Select
} from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    FilterOutlined,
    MinusOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";


export const DataTransactionScreen = observer(() => {
    const store = useStore();
    const [form] = Form.useForm();
    const history = useHistory();
    const { Search } = Input;

    
    useEffect(() => {
        fetchData();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function fetchData() {
        await store.transaction.getTransaction();
    }

    const columns = [
        {
            title: 'Transaction Name',
            dataIndex: 'transactionName',
            key: 'transactionName',
        },
        {
            title: 'PIC',
            dataIndex: 'pic',
            key: 'pic',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Delete</a>
                </Space>
            ),
        },
    ];


    return <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Breadcrumb>
            <Breadcrumb.Item>
                {/* Home */}
                <Link to={'/app/dashboard'}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span style={{ color: "#132743" }}>Data Transaction</span>
            </Breadcrumb.Item>
        </Breadcrumb>
        <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
            <PageHeader
                className="card-page-header"
                subTitle=""
                title={"Transaction"}
                extra={[
                    <Search
                        placeholder="Search...."
                        style={{ width: 200 }}
                        key={row => row._id}
                    />,
                    <Button
                        key={"1"}
                        // onClick={() => setFilterModal(true)}
                    >
                        <FilterOutlined /> Filter
                     </Button>
                ]}
            />
            <Table
                dataSource={store.transaction.data.slice()}
                columns={columns}
                style={{ paddingLeft: '12px' }}
            />
        </Card>
    </div>
})