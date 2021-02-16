import React, { useEffect, useState } from "react";
import {
    Table,
    Space,
    Popconfirm, Input,
    Form, Modal,
    message, Breadcrumb,
    PageHeader, Card, Button, Select
} from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    EyeOutlined,
    PrinterOutlined,
    FilterOutlined
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
        delete: false,
        new: false,
        warehouseId: '',
    });
    const [loading, setLoading] = useState(false);
    const [productId, setProductId] = useState('');
    const [id, setId] = useState('');
    const [filterModal, setFilterModal] = useState(false);
    const [filterQuery, setFilterQuery] = useState({});
    const [prOutId, setPrOut] = useState('');
    const [newModal, setNewModal] = useState(false);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterQuery])

    async function fetchData() {
        await store.purchase.getPurchaseOrderList();
        await store.barang.getDropdown();
    }

    // const appRender = () => {
    //     var workbook = xlsx.utils.book_new();
    //     var ws = xlsx.utils.json_to_sheet(dataReview);
    //     xlsx.utils.book_append_sheet(workbook, ws, "Results");
    //     xlsx.writeFile(workbook, 'out.xlsx', { type: 'file' });
    // }

    // const barang = store.barang.data.map((e) => {
    //     // console.log(barang)
    //     let data = {
    //         id: e._id,
    //         warehouseName: e.warehouseName,
    //         warehosueLocation: e.warehosueLocation
    //     }
    //     return data;
    // })

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

    const toggleSuccessReview = (() => {
        setState({
            purchase: !state.purchase,
        });
    })

    // const setEditModeReviewPassword = (value) => {
    //     setState(prevState => ({
    //         ...prevState,
    //         delete: true
    //     }))
    //     form.setFieldsValue({
    //         delete: true,
    //     })
    // }

    const setEditModeReviewNew = (value) => {
        setState(prevState => ({
            ...prevState,
            new: true
        }))
        form.setFieldsValue({
            new: true,
        })
    }

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

    const handleCancel = () => {
        // setIsModalVisible(false);
        form.validateFields().then(values => {
            form.resetFields();
        });
        toggleSuccessReview();
    };

    const handleCancelReviewItem = () => {
        // setIsModalVisible(false);
        form.validateFields().then(values => {
            form.resetFields();
        });
        toggleSuccessNew();
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

    const dataReview = store.purchase.data.map((e) => {
        let dataPurchase = {
            _id: e._id,
            invoiceNo: e.invoiceNo,
            suplierName: e.suplierName,
            senderPhone: e.senderPhone,
            pic: e.pic?.UserName,
            totalPurchaseItem: e.totalPurchaseItem,
            status: e.status
        }
        return dataPurchase
    })

    function onOkFilter() {
        store.noRef.warehouseId = state.warehouseId
        store.purchase.coy = state.warehouseId
        store.noRef.getNoRef()
        history.push("/app/input-product-in")
        setFilterModal(false);
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
                    }} style={{ color: '#132743' }}>
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
                                    // setStatus(record.id)
                                    setPrOut(record.id)
                                    // console.log(record.id)
                                    // setEditModeReviewPassword(true)
                                    // console.log(record.id)
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
                    //     <Button
                    //         key={"2"}
                    //         // onClick={() => setFilterModal(true)}
                    //     >
                    //         <FilterOutlined /> Filter
                    // </Button>,
                    ]}
                />
                {/* {ModalItemWarehouse()} */}
                {ModalItemWarehouse()}
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