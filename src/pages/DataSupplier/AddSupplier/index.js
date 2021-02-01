import React, { useEffect } from "react";
import { Form, Input, Breadcrumb, message, PageHeader, Card, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";

export const AddSupplierScreen = observer(() => {
    const store = useStore();
    const history = useHistory();
    const onFinish = values => {
        enterLoading(values);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchData() {
        await store.supliers.getSupplier();
    }

    const enterLoading = (e) => {
       
        const suplierAddress2 = {
            address: e.suplierAddress,
        }
        const data = {
            suplierName: e.suplierName,
            companyName: e.companyName,
            suplierAddress: suplierAddress2,
            suplierPhone: e.suplierPhone,
        }
        console.log(data)
        store.supliers.AddSupplier(data).then(res => {
            message.success('Berhasil Add Supliers');
            history.push("/app/data-supplier");
        }).catch(err => {
            message.error(err.message);
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