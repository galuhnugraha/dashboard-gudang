import React, { useEffect, useState } from "react";
import { Select, Row, Col, Form, Input, Breadcrumb, message, PageHeader, Card, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";

export const AddProductOut = observer(() => {
    const store = useStore();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const onFinish = values => {
        enterLoading(values);
        console.log(values);
    };

    useEffect(() => {

    }, [])

    const enterLoading = (e) => {
        setLoading(true);
        const data = {
            // sku: e.sku,
            location: e.location,
            quantity: e.quantity,
        }
        console.log(data, 'data guys');
        store.products.AddProductOut(data).then(res => {
            message.success('Berhasil Add Product Out');
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
                title={"Input Produk Out"}
            />
            <Form
                layout={'vertical'}
                name="normal_login"
                className="login-form"
                style={{ marginLeft: 23 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Location"
                    name="location"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Location!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
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
                    <Input type="number" style={{ width: '98%' }} />
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