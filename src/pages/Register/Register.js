import React from "react";
import {observer} from 'mobx-react-lite';
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col, Card,DatePicker } from 'antd';
import { UserOutlined, LockOutlined,PhoneOutlined,MailOutlined  } from '@ant-design/icons';

export const Register = observer(() => {
  let history = useHistory();


  return <div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
  <Row justify={'center'}>
    <Col>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10vh',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 0 5px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.20)'
      }}>
        <Card
          style={{ width: 500, textAlign: 'center' }}
          headStyle={{ fontSize: 13, fontWeight: 200 }}
          className={"shadow"}
          bordered={true}
          title={'Sign Up to your account'}
        >
          <Form
            layout={'vertical'}
            name="normal_login"
            className="login-form"
            style={{ marginTop: 4 }}
          >
            <Form.Item
              label="Email"
              name="email"
              size={'large'}
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<MailOutlined  className="site-form-item-icon" />}
                type="text"
                placeholder="Email" />
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
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              size={'large'}
              rules={[{ required: true, message: 'Please input your Phone!' }]}
            >
              <Input
                prefix={<PhoneOutlined  className="site-form-item-icon" />}
                type="number"
                placeholder="Phone" />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              size={'large'}
              rules={[{ required: true, message: 'Please input your Name!' }]}
            >
              <Input
                prefix={<UserOutlined   className="site-form-item-icon" />}
                type="text"
                placeholder="Name" />
            </Form.Item>
            <Form.Item
              label="Birth Day"
              name="BirthDay"
              size={'large'}
              rules={[{ required: true, message: 'Please input your Birth Day!' }]}
            >
              <DatePicker style={{width: 450}}/>
            </Form.Item>

            <Form.Item
              style={{
                marginBottom: 0,
                marginTop: 15
              }}>
              <Button style={{ backgroundColor: '#0000FF', color: 'white',borderRadius: 5 }}
                block
                htmlType="submit"
                size={'large'}
                className="login-form-button">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Col>
  </Row>
</div>;
});
