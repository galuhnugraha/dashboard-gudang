import React, { useState } from "react";
import { Form, Input, Breadcrumb, message, PageHeader, Select, Card, Button, Table } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import {
    PlusOutlined,
} from '@ant-design/icons';
import { observer } from "mobx-react-lite";

export const DataInputUserScreen = observer(() => {
    // const { Option } = Select;
    let history = useHistory();
    const store = useStore();
    const [loading, setLoading] = useState(false);

    const onFinish = values => {
        enterLoading(values);
    };

    const enterLoading = (e) => {
        setLoading(true);
        const data = {
            option: e.option,
            subOption: e.subOption,
            url: '/app/input-user-privillage'
        }
        store.user.addMenus(data).then(res => {
            message.success('Berhasil Add Departement');
            setLoading(false);
            history.push("/app/user-privillage");
        }).catch(err => {
            message.error(err.message);
            setLoading(false);
        });
    }

    return <div>
        <Card
            bordered={false}
            className={"shadow"}
            bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 5, boxShadow: '0 0 3px  0  rgba(0, 0, 0, 0.2), 0 3px 3px 0 rgba(0, 0, 0, 0.10)' }}
        >
            <PageHeader
                className={"card-page-header"}
                subTitle=""
                title={"Input Departemen"}
            />
            <Form
                layout={'vertical'}
                name="normal_login"
                className="login-form"
                style={{ marginLeft: 23 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Departemen"
                    name="option"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Name!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="Posisi"
                    name="subOption"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Name!' }]}
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
                        loading={loading}
                    >
                        Submit
					</Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
})