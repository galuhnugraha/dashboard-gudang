import React from "react";
import { AppRoutes } from "../../routes/app";
import { UserOutlined, DashboardOutlined, ContainerOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import {
  Layout, Menu, Col,
  Row, Avatar,Dropdown 
} from 'antd';
import { createUseStyles } from "react-jss";
import { Link,useHistory } from "react-router-dom";

const { Header, Content, Sider, Footer } = Layout;

const useStyles = createUseStyles({
  logo: `
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  `,
  hideSidebarButton: `
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    `,
  hideSidebarButtonHovered: {
    '&:hover': `
      color: #1890ff;
    `
  },
});

export const App = () => {
  const classes = useStyles();
  let history = useHistory();
  const logout = () => {
    history.push("/login");
  }
  const menu = (
    <Menu>
      <Menu.Item key="0" >
        <button onClick={logout}
          style={{
            backgroundColor: "white",
            border: "none",
            textAlign: "center",
            textDecoration: "none"
          }}
        >Logout</button>
      </Menu.Item>
    </Menu >
  );

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        style={{ background: '#0000FF' }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className={classes.logo} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ background: '#0000FF' }}>
          <Menu.Item key="1" style={{ color: 'white' }}>
            <Link to="/app/dashboard">
              <DashboardOutlined style={{ fontSize: 18 }} />
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/app/data-user">
              <UsergroupAddOutlined style={{ fontSize: 18 }} />
              <span>Data User</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/app/data-supplier">
              <ContainerOutlined style={{ fontSize: 18 }} />
              <span>Data Supplier</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/app/data-barang">
              <UserOutlined style={{ fontSize: 18 }} />
              <span>Data Barang</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Row type="flex" justify="end">
            {/* <Col>
              <p>test</p>
            </Col> */}
            <Col>
              <div className="ant-dropdown-link" href="#" style={{ color: 'grey', display: 'flex', flexDirection: 'row', height: 50 }}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <Avatar icon={<UserOutlined />} style={{ marginRight: 35, marginTop: 15 }} />
                </Dropdown>
                {/* <p style={{marginRight: 25}}>Halo Admin</p> */}
              </div>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            height: 'calc(100vh - 64px)',
          }}
        >
          <AppRoutes />
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2021 Created by PT APLIKASI KARYA UTAMA</Footer>
      </Layout>
    </Layout>
  );
};
