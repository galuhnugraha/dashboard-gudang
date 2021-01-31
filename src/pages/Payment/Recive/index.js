import React, { useEffect, useState } from "react";
import {
    Table,
    Space, Input, Breadcrumb,
    PageHeader, Card, Button, message,
    Popconfirm,Form,Modal
} from 'antd';
import {
    PlusOutlined,
    // EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";

function cancel(e) {
    message.error('Click on No');
}

export const DataReciveScreen = observer((initialData) => {
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
        await store.receive.getReceive();
    }

    function confirm(_id) {
        store.receive.deleteReceiveOrder(_id).then((res) => {
            message.success('Success delete Purchase Order')
            history.push('/app/receive');
            fetchData();
        }).catch(err => {
            // message.error(err.response.message)
        })
    }

    // const setEditMode = (value) => {
    //     setState(prevState => ({
    //         ...prevState,
    //         success: true
    //     }))
    //     form.setFieldsValue({
    //         isEdit: value._id,
    //         success: true,
    //         receiveOrderName: value.receiveOrderName,
    //         pic: value.pic,
    //         totalReciveItem: value.totalReciveItem,
    //     })
    // }

    const toggleSuccess = (() => {
        setState({
            success: !state.success,
        });
    })

    async function editData(e) {
        const data = {
            receiveOrderName: e.receiveOrderName,
            pic: e.pic,
            totalReciveItem: e.totalReciveItem,
        }

        if (e.isEdit) {
            store.receive.updateReceive(e.isEdit, data)
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
                title: 'Receive Order Name',
                dataIndex: 'receiveOrderName',
                key: 'receiveOrderName',
            },
            {
                title: 'PIC',
                dataIndex: 'pic',
                key: 'pic',
            },
            {
                title: 'Total Recive Item',
                dataIndex: 'totalReciveItem',
                key: 'totalReciveItem',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {/* <div>
                                <EditOutlined onClick={() => {
                                    setEditMode(record)
                                }} />
                            </div> */}
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
                    <span style={{ color: "#132743" }}>Data Recive</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
                <PageHeader
                    className="card-page-header"
                    subTitle=""
                    title={"Recive"}
                    extra={[
                        <Search
                            placeholder="Search...."
                            style={{ width: 200 }}
                            key={row => row._id}
                        />,
                        <Button
                            key={"1"}
                            onClick={() => {
                                history.push("/app/input-receive")
                            }}
                        >
                            <PlusOutlined /> New
                    </Button>,
                    ]}
                />
                {renderModal()}
                <Table
                    dataSource={store.receive.data.slice()}
                    columns={columns}
                    rowKey={record => record._id}
                    size="small"
                    style={{ paddingLeft: '12px' }}
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
                    label="receiveOrderName"
                    name="receiveOrderName"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Name!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="pic"
                    name="pic"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="totalReciveItem"
                    name="totalReciveItem"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
            </Form>
        </Modal>
    }
})