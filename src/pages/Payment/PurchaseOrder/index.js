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
    // DownloadOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";
// import axios from 'axios';
// import download from 'downloadjs';

function cancel(e) {
    message.error('Click on No');
}

export const PurchaseOrderScreen = observer((initialData) => {
    const store = useStore();
    const [form] = Form.useForm();
    const history = useHistory();
    const { Search } = Input;
    const [state, setState] = useState({
        success: false,
        // warehouseID: '',
    });

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function fetchData() {
        await store.purchase.getPurchaseOrderList();
    }

    function confirm(_id) {
        store.purchase.deletePurchaseOrder(_id).then((res) => {
            message.success('Success delete Purchase Order')
            history.push('/app/purchase-order');
            fetchData();
        }).catch(err => {
            // message.error(err.response.message)
        })
    }

    const setEditMode = (value) => {
        setState(prevState => ({
            ...prevState,
            success: true
        }))
        form.setFieldsValue({
            isEdit: value._id,
            success: true,
            purchaseName: value.purchaseName,
            suplierName: value.suplierName,
            destination: value.destination,
            pic: value.pic,
        })
    }

    const toggleSuccess = (() => {
        setState({
            success: !state.success,
        });
    })

    async function editData(e) {
        const data = {
            purchaseName: e.purchaseName,
            suplierName: e.suplierName,
            destination: e.destination,
            pic: e.pic,
            totalPurchaseItem: e.totalPurchaseItem
        }

        if (e.isEdit) {
            store.purchase.updatePurchase(e.isEdit, data)
                .then(res => {
                    message.success('Data Produk Di Update!');
                    toggleSuccess();
                    fetchData();
                })
                .catch(err => {
                    // message.error(err.message);
                });
        }
    }


    {

        const columns = [
            {
                title: 'No Invoice',
                dataIndex: 'invoiceNo',
                key: 'invoiceNo',
            },
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
                title: 'PIC',
                dataIndex: 'pic',
                key: 'pic',
            },
            {
                title: 'Total Purchase',
                dataIndex: 'totalPurchaseItem',
                key: 'totalPurchaseItem',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div>
                                <EditOutlined onClick={() => {
                                    setEditMode(record)
                                }} />
                            </div>
                            <Popconfirm
                                title="Are you sure to delete this task?"
                                onConfirm={() => {
                                    confirm(record._id)
                                }}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <div style={{ marginLeft: 8 }}>
                                    <DeleteOutlined />
                                </div>
                            </Popconfirm>
                        </div>
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
                            onClick={() => {
                                history.push("/app/input-purchase-order")
                            }}
                        >
                            <PlusOutlined /> New
                    </Button>,
                    ]}
                />
                {renderModal()}
                <Table
                    columns={columns}
                    rowKey={record => record._id}
                    dataSource={store.purchase.data.slice()}
                    style={{ paddingLeft: '12px' }}
                    size="small"
                />
            </Card>
        </div>
    }
    function renderModal() {
        return <Modal visible={state.success}
            closable={false}
            confirmLoading={false}
            destroyOnClose={true} title="Update Purchase Order"
            okText="Save"
            cancelText="Cancel"
            bodyStyle={{ background: '#f7fafc' }}
            onCancel={() => {
                form.validateFields().then(values => {
                    form.resetFields();
                });
                toggleSuccess();
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        editData(values);
                    })
                    .catch(info => {

                    });
            }}
        >
            <Form layout="vertical" form={form} className={'custom-form'} name="form_in_modal" initialValues={initialData}>
                <Form.Item name="isEdit" hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Purchase Name"
                    name="purchaseName"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Name!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="Suplier Name"
                    name="suplierName"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="Destination"
                    name="destination"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="PIC"
                    name="pic"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
            </Form>
        </Modal>
    }
})