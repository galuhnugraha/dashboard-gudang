import React from "react";
import { AppRoutes } from "../../routes/app";
import { UserOutlined, HomeOutlined, ContainerOutlined, InboxOutlined, UsergroupAddOutlined, MenuFoldOutlined } from '@ant-design/icons';
import {
  Layout, Menu, Col,
  Row, Avatar, Dropdown
} from 'antd';
import { createUseStyles } from "react-jss";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "../../utils/useStores";

const { Header, Content, Sider, Footer } = Layout;

const useStyles = createUseStyles({
  logo: `
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  `,
  hideSidebarButton: `SettingOutlined 
        font-size: 18px;
		padding: 0 24px;
		cursor: pointer;
		color: #fff;
		transition: color 0.3s;
    `,
  hideSidebarButtonHovered: { "&:hover": `color: #fff;` },

});

export const App = () => {
  const classes = useStyles();
  let history = useHistory();
  const store = useStore();
  const logout = () => {
    store.auth.logout().then((res) => {
      history.push("/login");
    });
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
    <Layout theme={"light"}
      className={"transparent"}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        style={{ background: '#132743' }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        className="site-layout-background"
      >
        <div className={classes.logo} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ background: 'transparent' }}
        >
          <Menu.Item key="1" style={{ color: 'white' }}>
            <Link to="/app/dashboard">
              <HomeOutlined style={{ fontSize: 18 }} />
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
              <InboxOutlined style={{ fontSize: 18 }} />
              <span>Data Barang</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, boxShadow: '0 0 5px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
          <Row type="flex" justify="space-between">
            <Col>
              <MenuFoldOutlined style={{ fontSize: 18, marginLeft: 15 }} />
            </Col>
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
            // background: '#fff',
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
