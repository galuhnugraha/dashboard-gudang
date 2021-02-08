import React, { useEffect, useState } from "react";
import {
    Table,
    Space,
    Popconfirm, Input,
    Form, Modal,
    message, Breadcrumb, Row, Col,
    PageHeader, Card, Button,
    Select
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import { observer } from "mobx-react-lite";


export const InputProductOut = observer(() => {
    var newID = ""
    const [form] = Form.useForm();
    const store = useStore();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [item, setItem] = useState([]);
    const [filterQuery, setFilterQuery] = useState({});


    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = () => {
        store.supliers.getSupplier();
        store.warehouse.getDataWarehouse();
        // store.supliers.getSupplierProductReview()
    }

    const onDetailProduct = async (val) => {
        // console.log(val, 'test')
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

    const handleDelete = (id) => {
        const deletedData = item.filter(item => item.key !== id)
        setItem(deletedData);
    };

    const getID = (val) => {
        newID = val
    }

    const onFinish = values => {
        dataPost(values);
    };

    const dataPost = (e) => {
        setLoading(true);
        const itemQuantity = store.supliers.detailData.map((e, i) => {
            let obj = {
                productId: e.product?._id,
                quantity: item[i].quantity,
            }
            return obj;
        })
        const data = {
            formName: e.formName,
            pic: e.pic,
            upperPic: e.upperPic,
            sender: e.sender,
            noref: e.noref,
            password: e.password,
            warehouseId: e.warehouseId,
            senderAddress: e.senderAddress,
            senderPhone: e.senderPhone,
            item: itemQuantity,
        }
        store.productOut.addProductOut(data).then(res => {
            setLoading(false);
            message.success('Berhasil Add Product');
            history.push("/app/product-out");
        }).catch(err => {
            setLoading(false);
            message.error(err.message);
        });
    }

    const columns = [
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
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <a>Delete</a>
                </Popconfirm>
            )
        },
    ];

    return <div>
        <Breadcrumb>
            <Breadcrumb.Item>
                {/* Home */}
                <Link to={'/app/dashboard'}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={'/app/product-out'}>Product Out</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span style={{ color: "#132743" }}>Input Product Out</span>
            </Breadcrumb.Item>
        </Breadcrumb>
        <Card
            bordered={false}
            className={"shadow"}
            bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 5, boxShadow: '0 0 3px  0  rgba(0, 0, 0, 0.2), 0 3px 3px 0 rgba(0, 0, 0, 0.10)' }}
        >
            <PageHeader
                className={"card-page-header"}
                subTitle=""
                title={"Input Product Out"}
            />
            <Form
                layout={'vertical'}
                name="normal_login"
                className="login-form"
                style={{ marginLeft: 23 }}
                form={form}
                onFinish={onFinish}
            >
                <Row>
                    <Col lg={11}>
                        <Form.Item
                            label="Form Name"
                            name="formName"
                            size={'large'}
                            rules={[{ required: true, message: 'Please input your Product Name!' }]}
                        >
                            <Input style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col lg={2} />
                    <Col lg={11}>
                        <Form.Item
                            label="PIC"
                            name="pic"
                            size={'large'}
                            rules={[{ required: true, message: 'Please input your Product Type!' }]}
                        >
                            <Input style={{ width: '95%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col lg={11}>
                        <Form.Item
                            label="Atasan"
                            name="upperPic"
                            size={'large'}
                        // rules={[{ required: true, message: 'Please input your Product Type!' }]}
                        >
                            <Input style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col lg={2} />
                    <Col lg={11}>
                        <Form.Item
                            label="Sender"
                            name="sender"
                            size={'large'}
                            rules={[{ required: true, message: 'Please input your Product Type!' }]}
                        >
                            <Input style={{ width: '95%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col lg={11}>
                        <Form.Item
                            label="Password"
                            name="password"
                            size={'large'}
                        // rules={[{ required: true, message: 'Please input your Product Type!' }]}
                        >
                            <Input.Password style={{ width: '98%' }} type="password" />
                        </Form.Item>
                    </Col>
                    <Col lg={2} />
                    <Col lg={11}>
                        <Form.Item
                            label="No Ref"
                            name="noref"
                            size={'large'}
                            rules={[{ required: true, message: 'Please input your Product Type!' }]}
                        >
                            <Input style={{ width: '95%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col lg={11}>
                        <Form.Item
                            label="Sender Phone"
                            name="senderPhone"
                            size={'large'}
                            rules={[{ required: true, message: 'Please input your Product Type!' }]}
                        >
                            <Input style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col lg={2} />
                    <Col lg={11}>
                        <Form.Item
                            label="Sender Address"
                            name="senderAddress"
                            size={'large'}
                            rules={[{ required: true, message: 'Please input your Product Type!' }]}
                        >
                            <Input style={{ width: '95%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="warehouseId"
                    label="Warehouse"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Warehouse!',
                        },
                    ]}
                >
                    <Select placeholder="Select Warehouse" style={{ width: '45%' }}>
                        {store.warehouse.data.map(d => <Select.Option value={d._id} key={d._id}>{d.warehouseName}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Product Item"
                    name="item"
                    size={'large'}
                >
                    <Select
                        placeholder="Select Product"
                        style={{ width: '98%' }}
                        mode="default"
                        onChange={(value) => {
                            getID(value)
                            onDetailProduct(value)
                        }}
                    >
                        {store.supliers.data.map(d => <Select.Option value={d._id} key={d._id} onChange>{d.suplierName}</Select.Option>)}
                    </Select>
                </Form.Item>
                {item.length >= 1 && <Table dataSource={item} columns={columns} rowKey={record => record._id} />}
                <Form.Item
                    style={{
                        marginBottom: 25,
                        width: 100
                    }}>
                    <Button style={{ backgroundColor: '#132743', color: 'white', borderRadius: 5 }}
                        block
                        htmlType="submit"
                        size={'large'}
                    // loading={loading}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
})