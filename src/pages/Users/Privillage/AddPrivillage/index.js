import React, { useEffect } from "react";
import { Form, Input, Breadcrumb, Space, Checkbox, PageHeader, Card, Button, Table, Select, Divider } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { observer } from "mobx-react-lite";


export const AddPrivillageScreen = observer(() => {
    const { Option, OptGroup } = Select;
    const [form] = Form.useForm();
    const store = useStore();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function fetchData() {
        store.user.getAll();
    }

    return <div>
        <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
            <PageHeader
                className="card-page-header"
                subTitle=""
                title={"Tambah Privillage Departemen"}
            />
            <Form layout={'vertical'}
                name="normal_login"
                className="login-form" style={{ paddingLeft: '14px' }}>
                <Form.Item label="Menu">
                    <Select placeholder="Pilih Select" style={{ width: '98%' }}>
                        {store.user.data.map(d => <Select.Option value={d._id} key={d._id}>{d.option}</Select.Option>)}
                    </Select>
                </Form.Item>
                {/* <Form.Item label="Hak Akses">
                    <Checkbox>Lihat</Checkbox>
                    <br />
                    <Checkbox>Tambah</Checkbox>
                    <br />
                    <Checkbox>Edit </Checkbox>
                    <br />
                    <Checkbox>Hapus</Checkbox>
                </Form.Item> */}
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