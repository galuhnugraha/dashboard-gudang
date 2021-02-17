import React, { useEffect, useState } from "react";
import {
    Table,
    Space,Input,
    Form, Modal,
    message, Breadcrumb,
    PageHeader, Card, Button, Select
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

export const PurchaseOrderScreen = observer((initialData) => {
    const store = useStore();
    const [form] = Form.useForm();
    const history = useHistory();
    const { Search } = Input;
    const [state, setState] = useState({
        success: false,
        purchase: false,
        delete: false,
        new: false,
        warehouseId: '',
        purchaseId: ''
    });
    const [prOutId, setPrOut] = useState('')
    const [filterModal, setFilterModal] = useState(false);
    const [filterQuery, setFilterQuery] = useState({});

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterQuery])

    async function fetchData() {
        // await store.purchase.getPurchaseOrderList();
        // await store.purchase.getPurchaseOrderListDetail();
        await store.barang.getDropdown();
        await store.purchase.getPurchaseOrderList();
    }

    function paramsId(value) {
        store.purchase.queryDetail.purchaseId = value
        setFilterQuery({
            ...filterQuery,
            purchaseId: state.purchaseId,
        })
        history.push("/app/detail-product-in/" + value)
    }

    const setEditMode = (value) => {
        setState(prevState => ({
            ...prevState,
            success: true
        }))
        form.setFieldsValue({
            isEdit: value._id,
            success: true,
            suplierName: value.suplierName,
            senderPhone: value.senderPhone,
            pic: value.pic,
        })
    }

    // const x = store.purchase.dataDetailObject
    // console.log(x._id)
    const tableCoy = store.purchase.data.map((e) => {
        let data = {
            _id: e._id,
            invoiceNo: e.invoiceNo,
            suplierName: e.suplierName,
            senderPhone: e.senderPhone,
            pic: e.pic?.UserName,
            totalPurchaseItem: e.totalPurchaseItem,
            status: e.status
        }
        return data
    })

    const setModeDelete = (value) => {
        setState(prevState => ({
            ...prevState,
            delete: true
        }))
        form.setFieldsValue({
            delete: true,
            // podId: value._id
        })
    }

    const toggleSuccess = (() => {
        setState({
            success: !state.success,
        });
    })

    const toggleSuccessNew = (() => {
        setState({
            new: !state.new,
        });
    })

    const toggleSuccessDeleted = (() => {
        setState({
            delete: !state.delete,
        });
    })

    async function editData(e) {
        const data = {
            suplierName: e.suplierName,
            senderPhone: e.senderPhone,
            pic: e.pic,
            totalPurchaseItem: e.totalPurchaseItem
        }

        if (e.isEdit) {
            store.purchase.updatePurchase(e.isEdit, data)
                .then(res => {
                    message.success('Data Produk In Di Update!');
                    toggleSuccess();
                    fetchData();
                })
                .catch(err => {
                    // message.error(err.message);
                });
        }
    }

    const handleCancelReviewItem = () => {
        // setIsModalVisible(false);
        form.validateFields().then(values => {
            form.resetFields();
        });
        toggleSuccessNew();
    };

    const handleCancelReviewDelete = () => {
        // setIsModalVisible(false);
        form.validateFields().then(values => {
            form.resetFields();
        });
        toggleSuccessDeleted();
    };

    // const onFinish = values => {
    //     dataPost(values);
    // };

    const deleteData = (e) => {
        const data = {
            PoId: prOutId,
            password: e.password,
        }
        // console.log(data)
        store.purchase.deleteProductIn(data).then((res) => {
            message.success('Success delete Purchase Order')
            history.push('/app/product-in');
            toggleSuccessDeleted()
            fetchData();
        }).catch(err => {
            message.error(err)
        })
    }

    function onOkFilter() {
        store.noRef.warehouseId = state.warehouseId
        store.purchase.coy = state.warehouseId
        store.noRef.getNoRef()
        history.push("/app/input-product-in")
        setFilterModal(false);
    }

    function ModalDeletedPO() {
        return <Modal
            maskClosable={false}
            closable={false}
            title={"Delete Product In"}
            visible={state.delete}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        deleteData(values)
                    })
                    .catch(info => {
                    });
            }}
            onCancel={handleCancelReviewDelete}
        >
            <Form layout="vertical" form={form} className={'custom-form'} name="form_in_modal">
                <Form.Item
                    label="Password"
                    name="password"
                    size={'large'}
                // rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Input.Password style={{ width: '98%' }} />
                </Form.Item>
            </Form>
        </Modal>
    }

    function ModalItemWarehouse() {
        return <Modal
            maskClosable={false}
            closable={false}
            afterClose={() => {
                setFilterModal(false)
            }}
            title={"Pilih Warehouse"}
            visible={filterModal}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        // editDetailPurchase(values);
                        // onFinish(values)
                        // deleteData(values)
                    })
                    .catch(info => {
                    });
            }}
            onCancel={handleCancelReviewItem}
            footer={[
                <Button key="2" onClick={() => setFilterModal(false)}>
                    Cancel
              </Button>,
                <Button key="1" style={{ backgroundColor: '#132743', color: 'white' }} onClick={onOkFilter}>
                    Ok
              </Button>,
            ]}
        >
            <Form layout="vertical" form={form} className={'custom-form'} name="form_in_modal">
                <Form.Item
                    label="Warehouse"
                    name="_id"
                    size={'large'}
                // rules={[{ required: true, message: 'Please input your Atasan' }]}
                >
                    <Select placeholder="Select Warehouse" style={{ width: '97%' }} onChange={(value) => {
                        setState({ warehouseId: value });
                        console.log(value)
                    }}>
                        {store.barang.data.map(d => <Select.Option value={d._id} key={d._id}>{d.warehouseName}</Select.Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    }

    {
        const columns = [
            {
                title: 'No Invoice',
                dataIndex: 'invoiceNo',
                key: 'invoiceNo',
                render: (text, record) => {
                    return (<div onClick={() => {
                        paramsId(record._id)
                    }} style={{ color: '#132743' }} >
                        {text}
                    </div>)
                },
            },
            {
                title: 'Suplier Name',
                dataIndex: 'suplierName',
                key: 'suplierName',
            },
            {
                title: 'Sender Phone',
                dataIndex: 'senderPhone',
                key: 'senderPhone',
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
                            <div style={{ marginLeft: 8 }}>
                                <DeleteOutlined onClick={() => {
                                  setPrOut(record._id)
                                  setModeDelete(true)
                                }} />
                            </div>
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
                    <span style={{ color: "#132743" }}>Product In</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 5, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
                <PageHeader
                    className="card-page-header"
                    subTitle=""
                    title={"Product In"}
                    extra={[
                        <Search
                            placeholder="Search...."
                            style={{ width: 200 }}
                            key={row => row._id}
                        />,
                        <Button
                            key={"1"}
                            onClick={() => {
                                setFilterModal(true)
                            }}
                        >
                            <PlusOutlined /> New
                        </Button>,
                    ]}
                />
                {ModalDeletedPO()}
                {ModalItemWarehouse()}
                {renderModal()}
                <Table
                    // columns={columns}
                    rowKey={record => record._id}
                    columns={columns}
                    dataSource={tableCoy}
                    loading={store.purchase.isLoading}
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
            destroyOnClose={true} title="Update Product In"
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
                    label="Suplier Name"
                    name="suplierName"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="Sender Phone"
                    name="senderPhone"
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