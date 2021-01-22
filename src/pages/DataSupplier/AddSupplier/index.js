import React, { useEffect, useState } from "react";
import { Select, Row, Col, Form, Input, Breadcrumb, message, PageHeader, Card, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";

export const AddSupplierScreen = observer(() => {
    const store = useStore();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const onFinish = values => {
        enterLoading(values);
    };


    const enterLoading = (e) => {
        setLoading(true);
        const suplierProduct2 = [{
            productName: e.suplierProduct,
            price: 12312312313
        }]
        const suplierAddress2 = {
            address: e.suplierAddress,
        }
        const data = {
            suplierName: e.suplierName,
            companyName: e.companyName,
            suplierAddress: suplierAddress2,
            suplierPhone: e.suplierPhone,
            suplierProduct: suplierProduct2
        }
        // data.suplierProduct = suplierProduct
        console.log(data, 'data guys');
        store.supliers.AddSupplier(data).then(res => {
            message.success('Berhasil Add Product');
            setLoading(false);
            history.push("/app/data-supplier");
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
                <span style={{ color: "#132743" }}>Input Supplier</span>
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
                title={"Input Supplier"}
            />
            <Form
                layout={'vertical'}
                name="normal_login"
                className="login-form"
                style={{ marginLeft: 23 }}
                onFinish={onFinish}
            >
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
                <Form.Item
                    label="Supplier Product"
                    name="suplierProduct"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Input style={{ width: '98%' }} />
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