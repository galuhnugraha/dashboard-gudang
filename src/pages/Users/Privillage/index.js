import React, { useEffect } from "react";
import { Form, Input, Breadcrumb, Space, PageHeader, Card, Button, Table } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { observer } from "mobx-react-lite";

export const DataPrivillageScreen = observer(() => {
    const { Search } = Input;
    const history = useHistory();

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
        },
        {
            key: '2',
            name: 'John',
        },
    ];

    const columns = [
        {
            title: 'Menu',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Lihat',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tambah',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Edit',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Hapus',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            render: (text, record) => (
                <Space size="middle">
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div>
                            <EditOutlined />
                        </div>
                        <div style={{ marginLeft: 8 }}>
                            <DeleteOutlined />
                        </div>
                        <div style={{ marginLeft: 8 }}>
                            <PlusOutlined onClick={() => {
                                // history.push("/app/privillage")
                            }} />
                        </div>
                    </div>
                </Space>
            ),
        },
    ];


    return <div>
        <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
            <PageHeader
                className="card-page-header"
                subTitle=""
                title={"Privillage"}
                extra={[
                    <Search
                        placeholder="Search...."
                        style={{ width: 200 }}
                    // key={row => row._id}
                    />,
                    <Button
                        key={"1"}
                        onClick={() => {
                            history.push("/app/input-privillage")
                        }}
                    >
                        Tambah Privillage
                    </Button>,
                ]}
            />
            <Table columns={columns} hasEmpty hasEmpty style={{ marginLeft: '12px' }} />
        </Card>
    </div>
})