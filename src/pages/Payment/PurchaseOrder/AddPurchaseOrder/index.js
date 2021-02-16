import React, { useEffect, useState } from "react";
import {
    Input,
    Form,
    message, Breadcrumb, Popconfirm, Divider, Modal,
    PageHeader, Card, Button, Select, Table, Row, Col
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import {
    DeleteOutlined,
} from '@ant-design/icons';
import { useStore } from "../../../../utils/useStores";
import { observer } from "mobx-react-lite";
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import Cookies from 'universal-cookie';


const renderContent = (value, row, index) => {
    const obj = {
        children: value,
        props: {},
    };
    if (index === 4) {
        obj.props.colSpan = 0;
    }
    return obj;
};

export const AddPurchaseOrder = observer((initialData) => {
    var myItem = new Array()
    var newID = ""
    const store = useStore();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState([]);
    const [filterQuery, setFilterQuery] = useState({});
    const [form] = Form.useForm();
    const [state, setState] = useState({
        success: false,
        form: false,
        detail: false,
        edit: false
    })
    const [location, setLocation] = useState('');
    const [filterProductSupliers, setFilterProductSupliers] = useState('');
    let x = '';
    const cookie = new Cookies();
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = () => {
        store.supliers.getSupplier();
        store.warehouse.getDataWarehouse();
        // store.noRef.get
        // store.supliers.getSupplierProductReview()
    }

    x = store.noRef.data;

    const toggleSuccess = (() => {
        setState({
            success: !state.success,
        });
    })

    const toggleSuccessReview = (() => {
        setState({
            form: !state.form,
        });
    })

    const toggleSuccessReviewDetail = (() => {
        setState({
            detail: !state.detail,
        });
    })

    const toggleSuccessReviewDetailEdit = (() => {
        setState({
            edit: !state.edit,
        });
    })

    const setEditMode = (value) => {
        setState(prevState => ({
            ...prevState,
            success: true
        }))
        form.setFieldsValue({
            isEdit: value._id,
            success: true,
        })
    }

    const setEditModeReview = (value) => {
        setState(prevState => ({
            ...prevState,
            form: true
        }))
        form.setFieldsValue({
            isEdit: value._id,
            form: true,
        })
    }

    const setEditModeReviewDetail = (value) => {
        setState(prevState => ({
            ...prevState,
            detail: true
        }))
        form.setFieldsValue({
            // isEdit: value._id,
            detail: true,
        })
    }

    const setDetailEditMode = (value) => {
        setState(prevState => ({
            ...prevState,
            edit: true
        }))
        form.setFieldsValue({
            isEdit: value.id,
            productName: value.productName,
            edit: true,
        })
    }


    const onDetailProduct = async (val) => {
        store.supliers.detailSuplierQueryItem.suplierId = val
        setFilterQuery({
            ...filterQuery,
            suplierId: val,
        })
        await store.supliers.getSupplierProductReview()
        const dataTable = store.supliers.detailData.map((e, i) => {
            let obj = {
                key: i,
                id: e.product?._id,
                productName: e.product?.productName,
                suplierName: e.suplier?.suplierName,
                suplierPhone: e.suplier?.suplierPhone,
                suplierAddress: e.suplier?.suplierAddress?.address,
                pricePerUnit: e.product?.pricePerUnit,
                quantity: e.product?.quantity,
                rack: e.product?.rack,
                location: e.product?.location,
                grosirPrice: e.product?.grosirPrice,
                sku: e.product?.sku
            }
            return obj;
        })
        setItem(dataTable)
    }

    const handleCancel = () => {
        // setIsModalVisible(false);
        form.validateFields().then(values => {
            form.resetFields();
        });
        toggleSuccess();
    };

    const handleCancelReview = () => {
        // setIsModalVisible(false);
        form.validateFields().then(values => {
            form.resetFields();
        });
        toggleSuccessReview();
    };

    const handleCancelReviewEdit = () => {
        // setIsModalVisible(false);
        form.validateFields().then(values => {
            form.resetFields();
        });
        toggleSuccessReviewDetailEdit();
    };

    const handleCancelReviewDetail = () => {
        // setIsModalVisible(false);
        form.validateFields().then(values => {
            form.resetFields();
        });
        toggleSuccessReviewDetail();
    };

    const onFinishSupliers = values => {
        enterLoading(values);
    };

    const enterLoading = (e) => {
        const suplierAddress2 = {
            address: e.suplierAddress,
            city: e.city
        }
        const data = {
            suplierName: e.suplierName,
            companyName: e.companyName,
            suplierAddress: suplierAddress2,
            suplierPhone: e.suplierPhone,
        }
        // console.log(data)
        store.supliers.AddSupplier(data).then(res => {
            message.success('Berhasil Add Supliers');
            history.push("/app/data-supplier");
        }).catch(err => {
            message.error(err.message);
        });
    }

    function ModalItemPurchaseReviewDetail() {
        return <Modal
            title={"Detail Product Name"}
            visible={state.detail}
            onOk={() => {
                form.validateFields().then(values => {
                    form.resetFields();
                });
                toggleSuccessReviewDetail();
            }}
            onCancel={handleCancelReviewDetail}
        // footer={null}
        >
            <Row>
                <Col span={12}>Product Name : {item[0]?.productName}</Col>
            </Row>
            <Row>
                <Col span={12}>Grosir Price : {item[0]?.grosirPrice}</Col>
                {/* <Col span={12}>Rak :  {selectedDataProduct[0]?.rack}</Col>
                <Col span={12}>Selfing :  {selectedDataProduct[0]?.selfing}</Col> */}
            </Row>
            <Row>
                <Col span={12}>Price Per Unit : {item[0]?.pricePerUnit}</Col>
                {/* <Col span={12}>LT :  {selectedDataProduct[0]?.lt}</Col>
                <Col span={12}>Room : {selectedDataProduct[0]?.room}</Col> */}
            </Row>
            <Row>
                <Col span={12}>SKU : {item[0]?.sku}</Col>
                {/* <Col span={12}>LT :  {selectedDataProduct[0]?.lt}</Col>
                <Col span={12}>Room : {selectedDataProduct[0]?.room}</Col> */}
            </Row>
            <Row>
                <Col span={12}>Location : {item[0]?.location}</Col>
                {/* <Col span={12}>LT :  {selectedDataProduct[0]?.lt}</Col>
                <Col span={12}>Room : {selectedDataProduct[0]?.room}</Col> */}
            </Row>
        </Modal>
    }

    async function editData(e) {
        const data = {
            productName: e.productName,
        }

        if (e.isEdit) {
            store.products.updateProduct(e.isEdit, data)
                .then(res => {
                    message.success('Data Produk Di Update!');
                    toggleSuccess();
                    fetchData();
                })
                .catch(err => {
                    message.error(`Error on Updating Member, ${err.message}`);
                    message.error(err.message);
                });
        }
    }

    function ModalItemPurchaseEdit() {
        return <Modal
            title={"Edit Product"}
            visible={state.edit}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        editData(values)
                    })
                    .catch(info => {
                    });
            }}
            onCancel={handleCancelReviewEdit}
        >
            <Form layout="vertical" form={form} className={'custom-form'} name="form_in_modal" initialValues={initialData}>
                <Form.Item name="isEdit" hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="ProductName"
                    name="productName"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Name!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
            </Form>
        </Modal>
    }

    function ModalItemPurchaseReview() {
        return <Modal
            title={"Detail Product"}
            visible={state.form}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {

                    })
                    .catch(info => {
                    });
            }}
            onCancel={handleCancelReview}
        >
            <Row>
                <Col span={12}>Supliers Name : {item[0]?.suplierName}</Col>
            </Row>
            <Row>
                <Col span={12}>Supliers Phone : {item[0]?.suplierPhone}</Col>
                {/* <Col span={12}>Rak :  {selectedDataProduct[0]?.rack}</Col>
                <Col span={12}>Selfing :  {selectedDataProduct[0]?.selfing}</Col> */}
            </Row>
            <Row>
                <Col span={12}>Supliers Address : {item[0]?.suplierAddress}</Col>
                {/* <Col span={12}>LT :  {selectedDataProduct[0]?.lt}</Col>
                <Col span={12}>Room : {selectedDataProduct[0]?.room}</Col> */}
            </Row>
        </Modal>
    }

    function ModalItemPurchase() {
        return <Modal
            title={"Add Supliers"}
            visible={state.success}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        // editDetailPurchase(values);
                        // onFinish(values)
                        onFinishSupliers(values)
                    })
                    .catch(info => {
                    });
            }}
            onCancel={handleCancel}
        >
            <Form layout="vertical" form={form} className={'custom-form'} name="form_in_modal">
                <Form.Item
                    label="Suplier Name"
                    name="suplierName"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Name!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="Company Name"
                    name="companyName"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="Supplier Address"
                    name="suplierAddress"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="Supplier Phone"
                    name="suplierPhone"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
            </Form>
        </Modal>
    }

    const columns = [
        {
            title: 'Kode Barang',
            dataIndex: 'sku',
            key: 'sku',
            record: (text, record) => <span>{text.sku || '-'}</span>
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            render: (text, record) => {
                return (<div>
                    <a style={{ color: '#132743' }} onClick={() => {
                        console.log(record)
                        setFilterProductSupliers(record)
                        setEditModeReview(record)
                    }}>{text}</a>
                </div>)
            },
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record, index) => <div>
                <Input onChange={(val) => {
                    // setItem(val)
                    item[index].quantity = val.target.value;
                    setItem(item);
                }} />
            </div>
        },
        {
            title: 'Keterangan',
            dataIndex: 'keterangan',
            key: 'keterangan',
            render: (text, record, index) => <div>
                <Input onChange={(val) => {
                    // setItem(val)
                    item[index].description = val.target.value;
                    setItem(item);
                }} />
            </div>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) => <div>
                <Input onChange={(val) => {
                    // setItem(val)
                    item[index].status = val.target.value;
                    setItem(item);
                }} />
            </div>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <div>
                    <a style={{ marginRight: 10 }} onClick={() => {
                        setEditModeReviewDetail(record)
                    }}>Detail</a>
                    <a style={{ marginRight: 10 }} onClick={() => {
                        setDetailEditMode(record)
                    }}>Edit</a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <DeleteOutlined />
                    </Popconfirm>
                </div>
            )
        },
    ];

    const columnsReview = [
        {
            title: 'Di input oleh ',
            dataIndex: 'pic',
            render: (record) => <span>
                <h3>{cookie.get("name")}</h3>
                <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
            </span>
        },
        {
            title: 'Kepala Gudang',
            colSpan: 2,
            dataIndex: 'tel',
            render: (value, row, index) => <span>
                {/* <Input onChange={(val) => {
                    // setItem(val)
                    // item[index].quantity = val.target.value;
                    // setItem(item);
                }} /> */}
                <p>Kosong</p>
                {/* <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p> */}
            </span>
        },
        {
            title: 'Phone',
            colSpan: 0,
            dataIndex: 'phone',
            render: () => <span>
                <p>Kosong</p>
            </span>,
        }
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            tel: '0571-22098909',
            phone: 18889898989,
            address: 'New York No. 1 Lake Park',
        },
    ];

    const handleDelete = (id) => {
        const deletedData = item.filter(item => item.key !== id)
        setItem(deletedData);
    };

    const getID = (val) => {
        newID = val
    }

    const dataPost = (e) => {
        setLoading(true);
        const itemQuantity = store.supliers.detailData.map((e, i) => {
            let obj = {
                productId: e.product?._id,
                quantity: item[i].quantity,
                description: item[i].description,
                status: item[i].status
            }
            return obj;
        })
        const data = {
            pic: cookie.get("name"),
            sender: e.sender,
            noref: x,
            senderPhone: e.senderPhone,
            item: itemQuantity,
        }
        // console.log(data)
        store.purchase.AddPurchaseOrder(data).then(res => {
            setLoading(false);
            message.success('Berhasil Add Product');
            history.push("/app/product-in");
        }).catch(err => {
            setLoading(false);
            message.error(err.message);
        });
    }

    return <div>
        <Breadcrumb>
            <Breadcrumb.Item>
                {/* Home */}
                <Link to={'/app/dashboard'}>Home</Link>
            </Breadcrumb.Item>
            {/* <Breadcrumb.Item>
                <Link to={'/app/product-in'}>Product In</Link>
            </Breadcrumb.Item> */}
            <Breadcrumb.Item>
                <span style={{ color: "#132743" }}>Input Product In</span>
            </Breadcrumb.Item>
        </Breadcrumb>
        <Card
            bordered={false}
            className={"shadow"}
            bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 5, boxShadow: '0 0 3px  0  rgba(0, 0, 0, 0.2), 0 3px 3px 0 rgba(0, 0, 0, 0.10)' }}
        >
            {/* <PageHeader
                className={"card-page-header"}
                subTitle=""
                title={"Input Product In"}
            /> */}
            <div style={{ marginTop: 25 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <h1>Form Barang Masuk</h1>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>No : {x}</p>
                </div>
            </div>
            <div style={{ marginLeft: 10 }}>
                <Row type="flex" justify="space-between">
                    <Col style={{ marginLeft: '12px' }}>
                        <Row>
                            <p>Suplier : </p>
                            <Select
                                placeholder="Select Product"
                                // style={{ width: '98%' }}
                                mode="default"
                                size="middle"
                                // defaultValue="Sony"
                                style={{ marginLeft: 10, width: 200 }}
                                onChange={(value) => {
                                    getID(value[1])
                                    onDetailProduct(value[1])
                                    setLocation(value[0])
                                    console.log(value)
                                }}
                                dropdownRender={menu => (
                                    <div>
                                        {menu}
                                        <Divider style={{ margin: '4px 0' }} />
                                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                            <a
                                                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                                //   onClick={this.addItem}
                                                onClick={() => {
                                                    setEditMode(true)
                                                }}
                                            >
                                                <PlusOutlined /> Add item
                                        </a>
                                        </div>
                                    </div>
                                )}
                            >
                                {store.supliers.data.map(d => <Select.Option value={[d.suplierName, d._id]} key={d._id}>{d.suplierName}</Select.Option>)}
                            </Select>
                        </Row>
                        <div style={{ marginTop: 25 }}>
                            <p>Alamat  : {item[0]?.suplierAddress}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ marginRight: 55, marginTop: 10 }}>
                            <p>Tanggal : {moment().format('MMMM Do YYYY')}</p>
                        </div>
                    </Col>
                </Row>
            </div>
            {ModalItemPurchaseEdit()}
            {ModalItemPurchaseReviewDetail()}
            {ModalItemPurchase()}
            {ModalItemPurchaseReview()}
            <Table dataSource={item} columns={columns} rowKey={record => record._id} style={{ marginLeft: '12px' }} />
            {/* {item.length >= 1 && <Table dataSource={item} columns={columns} rowKey={record => record._id} style={{ marginLeft: '12px' }} />} */}
            <Form
                layout={'vertical'}
                name="normal_login"
                className="login-form"
                style={{ marginLeft: 23, marginTop: 15 }}
                form={form}
                onFinish={dataPost}
            >
                <Row type="flex" justify="space-between">
                    <Col>
                        <Form.Item label="Pengirim" name="sender">
                            <Input placeholder="Masukan Nama Pengirim" style={{ width: 200 }} />
                        </Form.Item>
                        <Form.Item label="No Telepon" name="senderPhone">
                            <Input placeholder="Masukan Nama Pengirim" style={{ width: 200 }} />
                        </Form.Item>
                    </Col>
                    <Col style={{ marginRight: 45, marginTop: 10 }}>
                        {/* <p>Di Input Oleh : </p>
                        <h3>{cookie.get("name")}</h3>
                        <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p> */}
                        <Table columns={columnsReview} dataSource={data} bordered pagination={false} />
                    </Col>
                </Row>
                <Form.Item
                    style={{
                        marginBottom: 25,
                        width: 100
                    }}>
                    <Button style={{ backgroundColor: '#132743', color: 'white', borderRadius: 5 }}
                        block
                        htmlType="submit"
                        size={'large'}
                        loading={loading}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {/* <Divider style={{ margin: '4px 0' }} /> */}
        </Card>
    </div>
})