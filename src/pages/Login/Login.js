import React, { useState } from "react";
import { observer } from 'mobx-react-lite';
// import { useStore } from "../../utils/useStores";
// import { createUseStyles } from "react-jss";
// import { useHistory } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha'
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button, Row, Col, Card, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useStore } from "../../utils/useStores";

export const Login = observer(() => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const store = useStore();
  const [robot, setRobot] = useState(true);
  const [email, setEmail] = useState('');
  // const enterLoading = () => {
  //   history.push("/app/dashboard");
  // }
  const [state, setState] = useState({
    human: false,
    disabled: true,
  })

  const onFinish = values => {
    enterLoading(values);
  };

  const verifyCaptcha = (res) => {
    console.log(email)
    if (robot && email.length > 0) {
      setRobot(false)
      return
    }
    setRobot(true)
  }

  const expireCaptcha = () => {
    // this.setState({ human: false, humanKey: null })
    // this.setState({ disabled: this.isDisabled() })
    setState({
      human: false,
      humanKey: null,
      disabled: isDisabled()
    })
  }

  const isDisabled = () => {

    if (
      state.email != null &&
      state.human === true

    ) {
      console.log(state.human, 'bro')
      setRobot(true)
      return false
    }
    setRobot(false)
    return true
  }

  const test = (value) => {

    setEmail(value.target.value)
    if (robot && email) {
      setRobot(false)
      return
    }
    setRobot(true)
  }

  const enterLoading = (e) => {
    setLoading(true);
    const data = {
      email: e.email,
      password: e.password,
    }
    store.auth.login(data).then(res => {
      message.success('Berhasil Masuk');
      setLoading(false);
      history.push("/app/dashboard");
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
            title={'Sign in to your account'}
          >
            <Form
              layout={'vertical'}
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
            >
              <Form.Item
                label="email"
                name="email"
                size={'large'}
                rules={[{ required: false, message: 'Please input your email!' }]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  type="text"
                  placeholder="email" onChange={(value) => {
                    test(value)
                  }} />
              </Form.Item>

              <Form.Item
                style={{
                  marginBottom: 30,
                }}
                label="Password"
                name="password"
                size={'large'}
                rules={[{ required: false, message: 'Please input your Password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <div>
                <ReCAPTCHA
                  sitekey={'6LcxG0gaAAAAAOHR1etLjlNK3HXQHoxV7StMjq5W'}
                  // render="explicit"
                  // onloadCallback={this.onCaptchaLoad}
                  onChange={verifyCaptcha}
                  onExpired={expireCaptcha}
                />
              </div>
              <Form.Item
                style={{
                  marginBottom: 0,
                }}>
                <Button style={{ backgroundColor: '#132743', color: 'white', borderRadius: 6 }}
                  block
                  htmlType="submit"
                  loading={loading}
                  disabled={robot}
                  size={'large'}
                  className="login-form-button">
                  Sign In
              </Button>
              </Form.Item>
            </Form>
            <div style={{ marginTop: 10 }}>
              <Link to="/email-confirmation">
                <p>Forgot Password</p>
              </Link>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to="/register">
            <p style={{ marginTop: 10 }}>
              Don't account yet! <span style={{ color: '#132743' }}>Sign Up</span>
            </p>
          </Link>
        </div>
      </Col>
    </Row>
  </div>;
});