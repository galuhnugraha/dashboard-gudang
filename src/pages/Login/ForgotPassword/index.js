import React, { useState } from "react";
import { observer } from 'mobx-react-lite';
import ReCAPTCHA from 'react-google-recaptcha'
import { useHistory, Link, useParams } from "react-router-dom";
import { Form, Input, Button, Row, Col, Card, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useStore } from "../../../utils/useStores";

export const ForgotPassword = observer(() => {
    let history = useHistory();
    const {id} = useParams();
    console.log(id);
    const [loading, setLoading] = useState(false);
    const store = useStore();
    const [state, setState] = useState({
        human: false,
        disabled: true,
        email: ""
    })
    // const enterLoading = () => {
    //   history.push("/app/dashboard");
    // }

    const verifyCaptcha = (res) => {
        if (res) {
            //   this.setState({ human: true, humanKey: res })
            //   this.setState({ disabled: this.isDisabled() })
            setState({
                human: true,
                humanKey: res
            })
        }
    }

      const onFinish = (e) => {
        setLoading(true);
        const data = {
            newPassword: e.newPassword,
        }
        console.log(data)
        store.user.resetPassword(id,data).then(res => {
            message.success('Berhasil Ganti Password');
            setLoading(false);
            history.push("/login")
        }).catch(err => {
            message.error(err.message);
            setLoading(false);
        });
      }

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
                            onFinish={onFinish}
                        >

                            <Form.Item
                                style={{
                                    marginBottom: 30,
                                }}
                                label="Ganti Password"
                                name="newPassword"
                                size={'large'}
                                rules={[{ required: false, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined />}
                                    placeholder="Masukan Password Baru"
                                    type="password"
                                />
                            </Form.Item>
                            <Form.Item
                                style={{
                                    marginBottom: 0,
                                }}>
                                <Button style={{ backgroundColor: '#132743', color: 'white', borderRadius: 6 }}
                                    block
                                    htmlType="submit"
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
