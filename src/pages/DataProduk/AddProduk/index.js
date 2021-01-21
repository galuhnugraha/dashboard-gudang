import React, { useEffect, useState } from "react";
import { Select, Row, Col, Form, Input, Breadcrumb, message, PageHeader, Card, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";

export const AddProduk = observer(() => {
    const store = useStore();
    const [form] = Form.useForm();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [xImg , setXImg] = useState('')
    const [imgData, setImgData] = useState(null);

    const onFinish = values => {
        enterLoading(values);
    };

    const addImage = (info) => new Promise((result, reject) => {
        const data = info.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = () => result(setImgData(reader.result), reader.result);
        reader.onerror = error => reject(error);
    })

    const enterLoading = (e) => {
        setLoading(true);
        const data = {
            productName: e.productName,
            productType: e.productType,
            productImage: imgData,
            rack: e.rack,
            location: e.location,
            grosirPrice: e.grosirPrice,
            pricePerUnit: e.pricePerUnit,
            sku: e.sku,
            quantity: e.quantity,
            selfing: e.selfing
        }
        store.products.AddProduct(data).then(res => {
            message.success('Berhasil Add Product');
            setLoading(false);
            history.push("/app/data-produk");
        }).catch(err => {
            message.error(err.message);
            setLoading(false);
        });
    }

    return <div>
        <Breadcrumb>
            <Breadcrumb.Item>
                {/* Home */}
                <Link to={'/app/dashboard'}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span style={{ color: "#132743" }}>Input Produk</span>
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
                title={"Input Produk"}
            />
            <Form
                layout={'vertical'}
                name="normal_login"
                className="login-form"
                style={{ marginLeft: 23 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Product Name"
                    name="productName"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Name!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Row>
                    <Col lg={11}>
                        <Form.Item
                            label="Product Type"
                            name="productType"
                            size={'large'}
                            rules={[{ required: true, message: 'Please input your Product Type!' }]}
                        >
                            <Input style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col lg={2} />
                    <Col lg={11}>
                        <Form.Item
                            label="Product Location"
                            name="location"
                            size={'large'}
                            rules={[{ required: true, message: 'Please input your Product Location!' }]}
                        >
                            <Input style={{ width: '95%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col lg={11}>
                        <Form.Item
                            label="Rak"
                            name="rack"
                            size={'large'}
                            rules={[{ required: true, message: 'Please input your Rak!' }]}
                        >
                            <Input style={{ width: '98%' }} />
                        </Form.Item>
                    </Col>
                    <Col lg={2} />
                    <Col lg={11}>
                        <Form.Item
                            label="Selfing"
                            name="selfing"
                            size={'large'}
                            rules={[{ required: true, message: 'Please input your Selfing!' }]}
                        >
                            <Input style={{ width: '95%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col lg={11}>
                        <Form.Item
                            name="quantity"
                            label="Quantity"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Your Quantity!',
                                },
                            ]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col lg={2} />
                    <Col lg={11}>
                        <Form.Item
                            name="sku"
                            label="SKU"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your SKU!',
                                },
                            ]}
                        >
                            <Input style={{ width: '95%' }} type="number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col lg={11}>
                        <Form.Item
                            name="grosirPrice"
                            label="Grosir Price"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Your Grosir Price!',
                                },
                            ]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col lg={2} />
                    <Col lg={11}>
                        <Form.Item
                            name="pricePerUnit"
                            label="Price Per Unit"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Price Per Unit!',
                                },
                            ]}
                        >
                            <Input style={{ width: '95%' }} type="number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col lg={11}>
                        <Form.Item
                            name="supplier"
                            label="Supplier"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Your Grosir Supplier!',
                                },
                            ]}
                        >
                            <Select placeholder="Select Supplier" style={{ width: '98%' }}>
                                <Select.Option value="jack">Jack</Select.Option>
                                <Select.Option value="lucy">Lucy</Select.Option>
                                <Select.Option value="tom">Tom</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col lg={2} />
                    <Col lg={11}>
                        <Form.Item
                            name="warehouse"
                            label="Warehouse"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Warehouse!',
                                },
                            ]}
                        >
                            <Select placeholder="Select Warehouse" style={{ width: '95%' }}>
                                <Select.Option value="jack">Jack</Select.Option>
                                <Select.Option value="lucy">Lucy</Select.Option>
                                <Select.Option value="tom">Tom</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Product Image" name="productImage" rules={[{ required: true, message: 'Please input file Image!' }]} >
                    <input type='file' name="file" onChange={addImage}/>
                </Form.Item>

                <Form.Item
                    style={{
                        marginBottom: 25,
                        width: 100
                    }}>
                    <Button style={{ backgroundColor: '#132743', color: 'white', borderRadius: 5 }}
                        block
                        htmlType="submit"
                        size={'large'}
                    >
                        Submit
					</Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
})