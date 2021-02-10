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

    return <div>
        <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
            <PageHeader
                className="card-page-header"
                subTitle=""
                title={"Tambah Privillage Departemen"}
            // extra={[
            //     <Search
            //         placeholder="Search...."
            //         style={{ width: 200 }}
            //     // key={row => row._id}
            //     />,
            // ]}
            />
            <Form layout={'vertical'}
                name="normal_login"
                className="login-form" style={{ paddingLeft: '14px' }}>
                <Form.Item label="Menu">
                    <Select defaultValue="lucy" style={{ width: '98%' }}>
                        <OptGroup label="Manager">
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                        </OptGroup>
                        <OptGroup label="Engineer">
                            <Option value="Yiminghe">yiminghe</Option>
                        </OptGroup>
                    </Select>
                </Form.Item>
                <Form.Item label="Hak Akses">
                    <Checkbox>Lihat</Checkbox>
                    <br />
                    <Checkbox>Tambah</Checkbox>
                    <br />
                    <Checkbox>Edit </Checkbox>
                    <br />
                    <Checkbox>Hapus</Checkbox>
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