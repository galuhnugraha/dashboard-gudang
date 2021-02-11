import React, { useEffect, useState } from "react";
import { Form, Input, Breadcrumb, Switch, Space, Popconfirm, PageHeader, Card, Button, message, Table, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { observer } from "mobx-react-lite";

function cancel(e) {
    message.error('Click on No');
}

export const DetailPrivillageScreen = observer((initialData) => {
    const { Search } = Input;
    let history = useHistory();
    const [form] = Form.useForm();
    const store = useStore();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        success: false,
    });
    
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function fetchData() {
        store.user.getUsersPrivillage();
    }

    const columns = [
        {
            title: 'Nama',
            dataIndex: 'option',
            key: 'option',
        },
        {
            title: 'Text',
            dataIndex: 'subOption',
            key: 'subOption',
        },
        {
            title: 'Action',
        },
    ];

    return <div>
        <Breadcrumb>
            <Breadcrumb.Item>
                {/* Home */}
                <Link to={'/app/dashboard'}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span style={{ color: "#132743" }}>User Privillage</span>
            </Breadcrumb.Item>
        </Breadcrumb>
        <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
            <PageHeader
                className="card-page-header"
                subTitle=""
                title={"Users"}
                extra={[
                    <Search
                        placeholder="Search...."
                        style={{ width: 200 }}
                    // key={row => row._id}
                    />,
                    <Button
                        key={"1"}
                        onClick={() => {
                            history.push("/app/input-user-privillage")
                        }}
                    >
                        Tambah
                    </Button>,
                ]}
            />
            <Table columns={columns}  size="small" hasEmpty style={{ marginLeft: '12px' }} />
        </Card>
    </div>
})