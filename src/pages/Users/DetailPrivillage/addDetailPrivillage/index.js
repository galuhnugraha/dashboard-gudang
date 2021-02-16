import React, { useState } from "react";
import { Form, Input, message, DatePicker, Checkbox, Switch, PageHeader, Card, Button, Table } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import {
    UserOutlined, LockOutlined, PhoneOutlined, MailOutlined
} from '@ant-design/icons';
import { observer } from "mobx-react-lite";

export const AddDetailPrivillage = observer(() => {
    const { Search } = Input;
    const history = useHistory();
    const store = useStore();
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const [read,setRead] = useState(false);

    const onFinish = values => {
        enterLoading(values);
    };

    const unChecked = (e) => {
        setCheck(e)
    }

    const unCheckedRead = (e) => {
        setRead(e)
    }

    const enterLoading = (e) => {
        setLoading(true);
        const dapartment = store.user.query.dapartment;
        // console.log(detail,'data cuy');
        setCheck(e.insert)
        setRead(e.read)
        const postion = store.user.query.position
        const data = {
            email: e.email,
            password: e.password,
            name: e.name,
            phone: e.phone,
            birthDate: e.birthDate,
            dapartment: dapartment,
            position: postion,
            insert: e.insert,
            update: e.update,
            read: e.read,
            deleted: e.deleted
        }
        store.auth.registerUsers(data).then(res => {
            message.success('Berhasil Add Privillage');
            setLoading(false);
            history.push("/app/privillage-detail");
        }).catch(err => {
            message.error(err.message);
            setLoading(false);
        });
    }

    return <div>
        <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
            <PageHeader
                className="card-page-header"
                subTitle=""
                title={"Tambah Users"}
            />
            <Form
                layout={'vertical'}
                name="normal_login"
                className="login-form"
                style={{ marginLeft: 23 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        type="text"
                        placeholder="Email" style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        style={{ width: '98%' }}
                    />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name="phone"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Phone!' }]}
                >
                    <Input
                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                        type="number"
                        placeholder="Phone" style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Name!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        type="text"
                        placeholder="Name" style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="Tanggal Lahir"
                    name="birthDate"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Birth Day!' }]}
                >
                    <DatePicker style={{ width: '98%' }} />
                </Form.Item>
                <p>Allow Permission</p>
                <Form.Item label="Insert" name="insert">
                    <Switch checked={check} onChange={unChecked} />
                </Form.Item>
                <Form.Item label="Update" name="update">
                    <Switch />
                </Form.Item>
                <Form.Item label="Deleted" name="deleted">
                    <Switch />
                </Form.Item>
                <Form.Item label="Read" name="read">
                    <Switch checked={read} onChange={unCheckedRead}/>
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
                        // loading={loading}
                    >
                        Submit
					</Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
})