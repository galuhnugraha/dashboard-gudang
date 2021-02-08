import React, { useEffect, useState } from "react";
import {
    Table,
    Space,
    Popconfirm, Input,
    Form, Modal,
    message, Breadcrumb,
    PageHeader, Card, Button,
} from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    EyeOutlined
    // DownloadOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";

export const ProductOut = observer(() => {
    const history = useHistory();
    const store = useStore();
    const { Search } = Input;

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function fetchData() {
        store.productOut.getProductOut();
    }

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'No Invoice',
            dataIndex: 'invoiceNo',
            key: 'invoiceNo',
        },
        {
            title: 'Form Name',
            dataIndex: 'formName',
            key: 'formName',
        },
        {
            title: 'Sender Address',
            dataIndex: 'senderAddress',
            key: 'senderAddress',
        },
        {
            title: 'Sender Phone',
            dataIndex: 'senderPhone',
            key: 'senderPhone',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    return <div>
        <Breadcrumb>
            <Breadcrumb.Item>
                {/* Home */}
                <Link to={'/app/dashboard'}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span style={{ color: "#132743" }}>Product Out</span>
            </Breadcrumb.Item>
        </Breadcrumb>
        <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 25, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
            <PageHeader
                className={"card-page-header"}
                subTitle=""
                title={"Product Out"}
                extra={[
                    <Search
                        placeholder="Search...."
                        style={{ width: 200 }}
                        key={row => row._id}
                    />,
                    <Button
                        key={"1"}
                        onClick={() => {
                            history.push("/app/input-product-out")
                        }}
                    >
                        <PlusOutlined /> New
                    </Button>,
                ]}
            />
            <Table dataSource={store.productOut.data.slice()} columns={columns} style={{ paddingLeft: '12px' }}
                size="small" />
        </Card>
    </div>
})