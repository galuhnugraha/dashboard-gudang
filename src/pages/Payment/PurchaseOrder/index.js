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


export const PurchaseOrderScreen = observer(() => {
    const store = useStore();
    const [form] = Form.useForm();
    const history = useHistory();
    const { Search } = Input;
    const dataSource = [
        {
            key: '1',
            purchaseName: 'Mike',
            suplierName: 32,
            destination: '10 Downing Street',
            totalPurchase: 10
        },
        {
            key: '2',
            purchaseName: 'John',
            suplierName: 42,
            destination: '10 Downing Street',
            totalPurchase: 15
        },
    ];

    const columns = [
        {
            title: 'Purchase Name',
            dataIndex: 'purchaseName',
            key: 'purchaseName',
        },
        {
            title: 'Suplier Name',
            dataIndex: 'suplierName',
            key: 'suplierName',
        },
        {
            title: 'Destination',
            dataIndex: 'destination',
            key: 'destination',
        },
        {
            title: 'Total Purchase',
            dataIndex: 'totalPurchase',
            key: 'totalPurchase',
        }
    ];


    return <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Breadcrumb>
            <Breadcrumb.Item>
                {/* Home */}
                <Link to={'/app/dashboard'}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span style={{ color: "#132743" }}>Purchase Order</span>
            </Breadcrumb.Item>
        </Breadcrumb>
        <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 5, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
            <PageHeader
                className="card-page-header"
                subTitle=""
                title={"Purchase Order"}
                extra={[
                    <Search
                        placeholder="Search...."
                        style={{ width: 200 }}
                        key={row => row._id}
                    />,
                    <Button
                        key={"1"}
                    >
                        <PlusOutlined /> New
                    </Button>,
                ]}
            />
            <Table
                dataSource={dataSource}
                columns={columns} 
                style={{ paddingLeft: '12px' }}
            />
        </Card>
    </div>
})