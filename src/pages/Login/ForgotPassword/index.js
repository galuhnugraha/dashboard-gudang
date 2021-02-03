import React, { useState } from "react";
import { observer } from 'mobx-react-lite';
// import { useStore } from "../../utils/useStores";
// import { createUseStyles } from "react-jss";
// import { useHistory } from "react-router-dom";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button, Row, Col, Card, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useStore } from "../../../utils/useStores";

export const ForgotPassword = observer(() => {
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const store = useStore();
    // const enterLoading = () => {
    //   history.push("/app/dashboard");
    // }

    const { Paragraph } = Typography;

    return <div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
        <Row justify={'center'}>
            <Col>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginTop: '12vh',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                        <Paragraph
                            style={{
                                margin: 0,
                                padding: 0,
                                fontSize: 20,
                                marginLeft: 5,
                                fontWeight: 600,
                                marginBottom: 20,
                                color: "#413d3e",
                            }}
                        >
                            Dashboard Gudang
                        </Paragraph>
                    </div>
                    <Card
                        style={{ width: 320, textAlign: 'center', boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.20)' }}
                        headStyle={{ fontSize: 13, fontWeight: 200 }}
                        className={"shadow"}
                        bordered={true}
                        title={'Change Password New'}
                    >
                        <Form
                            layout={'vertical'}
                            name="normal_login"
                            className="login-form"
                            // onFinish={onFinish}
                        >

                            <Form.Item
                                style={{
                                    marginBottom: 30,
                                }}
                                label="Password Lama"
                                name="password_lama"
                                size={'large'}
                                rules={[{ required: false, message: 'Please input your Password!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item
                                style={{
                                    marginBottom: 30,
                                }}
                                label="New Password"
                                name="password_new"
                                size={'large'}
                                rules={[{ required: false, message: 'Please input your Password!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                style={{
                                    marginBottom: 0,
                                }}>
                                <Button style={{ backgroundColor: '#132743', color: 'white', borderRadius: 6 }}
                                    block
                                    htmlType="submit"
                                    // loading={loading}
                                    size={'large'}
                                    className="login-form-button">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Col>
        </Row>
    </div>;
});
