import React, {useState } from "react";
import {Form, Input, Breadcrumb, message, PageHeader, Card, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";

export const AddWarehouse = observer(() => {
    const store = useStore();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const onFinish = values => {
        enterLoading(values);
    };

    const enterLoading = (e) => {
        setLoading(true);
        const data = {
            warehouseName: e.warehouseName,
            warehosueLocation: e.warehosueLocation,
        }
        store.warehouse.AddWarehouse(data).then(res => {
            message.success('Berhasil Add Product');
            setLoading(false);
            history.push("/app/data-warehouse");
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
                <span style={{ color: "#132743" }}>Input Warehouse</span>
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
                title={"Input Warehouse"}
            />
            <Form
                layout={'vertical'}
                name="normal_login"
                className="login-form"
                style={{ marginLeft: 23 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Warehouse Name"
                    name="warehouseName"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Name!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="Warehouse Location"
                    name="warehosueLocation"
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