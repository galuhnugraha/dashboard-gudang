import React, { useState, useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { Form, Input, PageHeader, Breadcrumb, Button, Card, DatePicker, message } from 'antd';
import { useStore } from "../../utils/useStores";
import { Link } from 'react-router-dom';
import {
  UserOutlined, PhoneOutlined, MailOutlined
} from '@ant-design/icons';

export const EditProfile = observer((initialData) => {
  const store = useStore();
  const [state, setState] = useState({
    success: false,
  });

  useEffect(() => {
    store.user.getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    await store.user.getAll();
  }

  const toggleSuccess = (() => {
    setState({
      success: !state.success,
    });
  })

  async function editData(e) {
    setState(prevState => ({
      ...prevState,
      success: true
    }))
    const data = {
      email: e.email,
      name: e.name,
      phone: e.phone,
      birthDate: e.birthDate
    }
    if (e.isEdit) {
      store.user.updateMember(e.isEdit, data)
        .then(res => {
          message.success('Data Member Di Update!');
          toggleSuccess();
          fetchData();
        })
        .catch(err => {
          message.error(`Error on Updating Member, ${err.message}`);
          message.error(err.message);
        });
    }
  }

  return <div>
    <Breadcrumb>
      <Breadcrumb.Item>
        {/* Home */}
        <Link to={'/app/dashboard'}>Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span style={{ color: "#132743" }}>Edit Profile</span>
      </Breadcrumb.Item>
    </Breadcrumb>
    <Card
      bordered={false}
      className={"shadow"}
      bodyStyle={{ padding: 0, marginTop: 25, borderRadius: 5, boxShadow: '0 0 3px  0  rgba(0, 0, 0, 0.2), 0 3px 3px 0 rgba(0, 0, 0, 0.10)' }}
    >
      <PageHeader
        className={"card-page-header"}
        subTitle=""
        title={"Edit Profile"}
      // extra={[
      //   <Button
      //     key="1"
      //   >
      //     <PlusOutlined /> New
      //     </Button>,
      // ]}
      />
      <Form
        layout={'vertical'}
        name="normal_login"
        className="login-form"
        style={{ marginLeft: 15 }}
        initialValues={initialData}
        onFinish={editData}
      >
        <Form.Item name="isEdit" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Email" style={{ width: '97%' }} />
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
            placeholder="Phone" style={{ width: '97%' }} />
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
            placeholder="Name" style={{ width: '97%' }} />
        </Form.Item>
        <Form.Item
          label="Birth Date"
          name="birthDate"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Birth Day!' }]}
        >
          <DatePicker style={{ width: '97%' }} />
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