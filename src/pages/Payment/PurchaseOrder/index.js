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
    EyeOutlined,
    PrinterOutlined
    // DownloadOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";
import xlsx from 'xlsx';

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
        purchase: false,
        delete: false
        // warehouseID: '',
    });
    const [loading, setLoading] = useState(false);
    const [productId, setProductId] = useState('');
    // const [status, setStatus] = useState('');
    const [prOutId, setPrOut] = useState('')

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function fetchData() {
        await store.purchase.getPurchaseOrderList();
    }

    const appRender = () => {
        var workbook = xlsx.utils.book_new();
        var ws = xlsx.utils.json_to_sheet(dataReview);
        xlsx.utils.book_append_sheet(workbook, ws, "Results");
        xlsx.writeFile(workbook, 'out.xlsx', { type: 'file' });
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

    const toggleSuccessReview = (() => {
        setState({
            purchase: !state.purchase,
        });
    })


    const toggleSuccessPassword = (() => {
        setState({
            delete: !state.delete,
        });
    })

    const setEditModeReviewPassword = (value) => {
        setState(prevState => ({
            ...prevState,
            delete: true
        }))
        form.setFieldsValue({
            delete: true,
        })
    }

    const setEditModeReviewPurchase = (value) => {
        setState(prevState => ({
            ...prevState,
            purchase: true
        }))
        form.setFieldsValue({
            purchase: true,
        })
    }

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

    const handleCancel = () => {
        // setIsModalVisible(false);
        form.validateFields().then(values => {
            form.resetFields();
        });
        toggleSuccessReview();
    };

    const handleCancelProduct = () => {
        // setIsModalVisible(false);
        form.validateFields().then(values => {
            form.resetFields();
        });
        toggleSuccessPassword();
    };

    const onFinish = values => {
        dataPost(values);
    };

    const dataPost = (e) => {
        setLoading(true);
        const data = {
            purchaseId: productId,
            upperPic: e.upperPic,
            password: e.password,

        }
        store.purchase.approve(data).then(res => {
            setLoading(false);
            message.success('Berhasil Approve');
            history.push("/app/product-in");
            fetchData()
        }).catch(err => {
            setLoading(false);
            message.error(err.message);
        });
    }

    const deleteData = (e) => {
        const data = {
            PoId: prOutId,
            responsible: e.responsible,
            password: e.password,
        }
        // console.log(data)
        store.purchase.deleteProductIn(data).then((res) => {
            message.success('Success delete Purchase Order')
            history.push('/app/product-in');
            fetchData();
        }).catch(err => {
            message.error(err)
        })
    }

    function ModalItemPassword() {
        return <Modal
            title={"Silakan Masukan Password Anda"}
            visible={state.delete}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        // editDetailPurchase(values);
                        // onFinish(values)
                        deleteData(values)
                    })
                    .catch(info => {
                    });
            }}
            onCancel={handleCancelProduct}
        >
            <Form layout="vertical" form={form} className={'custom-form'} name="form_in_modal">
                <Form.Item
                    label="Nama"
                    name="responsible"
                    size={'large'}
                // rules={[{ required: true, message: 'Please input your Atasan' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    size={'large'}
                // rules={[{ required: true, message: 'Please input your Atasan' }]}
                >
                    <Input.Password type="password" />
                </Form.Item>
            </Form>
        </Modal>
    }

    function ModalItemPurchase() {
        return <Modal
            title={"Form Product In"}
            visible={state.purchase}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        // editDetailPurchase(values);
                        onFinish(values)
                    })
                    .catch(info => {
                    });
            }}
            onCancel={handleCancel}
        >
            <Form layout="vertical" form={form} className={'custom-form'} name="form_in_modal">
                <Form.Item
                    label="Atasan"
                    name="upperPic"
                    size={'large'}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    size={'large'}
                // rules={[{ required: true, message: 'Please input your Atasan' }]}
                >
                    <Input.Password type="password" />
                </Form.Item>
            </Form>
        </Modal>
    }

    const dataReview = store.purchase.data.map((e) => {
        let dataPurchase = {
            id: e._id,
            purchaseName: e.purchaseName,
            invoiceNo: e.invoiceNo,
            suplierName: e.suplierName,
            destination: e.destination,
            pic: e.pic,
            totalPurchaseItem: e.totalPurchaseItem,
            status: e.status
        }
        return dataPurchase
    })
    

    // function FilterPurchase(value) {
    //     // console.log(value.status)
    //     console.log(value)
    //     return value == status
    // }

    // const selectedDataProduct = dataReview.filter(FilterPurchase);
    // console.log(selectedDataProduct.status)

    {

        const columns = [
            {
                title: 'No Invoice',
                dataIndex: 'invoiceNo',
                key: 'invoiceNo',
                render: (text, record) => {
                    return (<div onClick={() => {
                    }} style={{ color: '#132743' }}>
                        {text}
                    </div>)
                },
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
                            {/* <Popconfirm
                                title="Are you sure to delete this task?"
                                onConfirm={() => {
                                    // console.log(record.id)
                                    // confirm(record.id)
                                    setEditModeReviewPassword(record)
                                }}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <div style={{ marginLeft: 8 }}>
                                    <DeleteOutlined />
                                </div>
                            </Popconfirm> */}
                            <div style={{ marginLeft: 8 }}>
                                <DeleteOutlined onClick={() => {
                                    // setStatus(record.id)
                                    setPrOut(record.id)
                                    console.log(record.id)
                                    setEditModeReviewPassword(true)
                                    // console.log(record.id)
                                }} />
                            </div>
                            <div style={{ marginLeft: 8 }}>
                                <EyeOutlined onClick={() => {
                                    // console.log(record.id)
                                    setProductId(record.id)
                                    setEditModeReviewPurchase(true)
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
                                history.push("/app/input-product-in")
                            }}
                        >
                            <PlusOutlined /> New
                        </Button>,
                        <Button
                            key={"2"}
                            onClick={() => {
                                appRender()
                            }}
                        >
                            <PrinterOutlined /> Export
                    </Button>,
                    ]}
                />
                {ModalItemPassword()}
                {ModalItemPurchase()}
                {renderModal()}
                <Table
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={dataReview}
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