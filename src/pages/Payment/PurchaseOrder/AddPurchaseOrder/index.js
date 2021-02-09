import React, { useEffect, useState } from "react";
import {
    Input,
    Form,
    message, Breadcrumb, Popconfirm, Divider, Modal,
    PageHeader, Card, Button, Select, Table, Row, Col
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import { observer } from "mobx-react-lite";
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

export const AddPurchaseOrder = observer(() => {
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
    })
    const [noRef, setNoRef] = useState('');
    let x = '';
    
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = () => {
        store.supliers.getSupplier();
        store.warehouse.getDataWarehouse();
        store.noRef.getNoRef();
        // store.supliers.getSupplierProductReview()
    }

    x = store.noRef.data;
    console.log(x);

    const toggleSuccess = (() => {
        setState({
            success: !state.success,
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
                pricePerUnit: e.product?.pricePerUnit,
                quantity: e.product?.quantity,
                rack: e.product?.rack,
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

    // const onFinish = values => {
    //     dataPost(values);
    // };

    const columns = [
        // {
        //     title: 'No',
        //     dataIndex: 'no',
        //     key: 'no',
        //     // record: (text,record) => <span>{record+1}</span>
        // },
        {
            title: 'Kode Barang',
            dataIndex: 'sku',
            key: 'sku',
            record: (text, record) => <span>{text.sku || '-'}</span>
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName'
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
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <a>Delete</a>
                </Popconfirm>
            )
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
            // purchaseName: e.purchaseName,
            pic: localStorage.getItem("name"),
            upperPic: e.upperPic,
            sender: e.sender,
            noref: e.noref,
            warehouseId: e.warehouseId,
            // password: e.password,
            senderAddress: e.senderAddress,
            senderPhone: e.senderPhone,
            item: itemQuantity,
        }
        store.purchase.AddPurchaseOrder(data).then(res => {
            setLoading(false);
            message.success('Berhasil Add Product');
            history.push("/app/product-in");
        }).catch(err => {
            setLoading(false);
            message.error(err.message);
        });
    }

    // console.log(store.noRef.data.codeNumber)

    return <div>
        <Breadcrumb>
            <Breadcrumb.Item>
                {/* Home */}
                <Link to={'/app/dashboard'}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={'/app/product-in'}>Product In</Link>
            </Breadcrumb.Item>
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
                                    getID(value)
                                    onDetailProduct(value)
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
                                {store.supliers.data.map(d => <Select.Option value={d._id} key={d._id} onChange>{d.suplierName}</Select.Option>)}
                            </Select>
                        </Row>
                        <div style={{ marginTop: 25 }}>
                            <p>Alamat  : - </p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ marginRight: 55, marginTop: 10 }}>
                            <p>Tanggal : {moment().format('MMMM Do YYYY')}</p>
                        </div>
                    </Col>
                </Row>
            </div>
            {ModalItemPurchase()}
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
                        <p>Di Input Oleh : </p>
                        <h3>{localStorage.getItem("name")}</h3>
                        <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
                        {/* <Table columns={columnsBarang} dataSource={dataBarang}/> */}
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