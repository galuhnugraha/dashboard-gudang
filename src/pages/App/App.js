import React, { useState } from "react";
import { AppRoutes } from "../../routes/app";
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import {
  Layout, Menu, Col,
  Row, Avatar, Dropdown
} from 'antd';
import { createUseStyles } from "react-jss";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "../../utils/useStores";
import "antd/dist/antd.css";
import "./index.css";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const useStyles = createUseStyles({
  logo: `
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  `,
  hideSidebarButton: `SettingOutlined 
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
    `,
  hideSidebarButtonHovered: { "&:hover": `color: #1890ff;` },

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


  const [collapsed, setCollapsed] = useState(false);
  const menu = (
    <Menu>
      {/* <Menu.Item defaultSelectedKeys={['profile']} key="0">
        <button onClick={editProfile}
          style={{
            backgroundColor: "white",
            border: "none",
            textAlign: "center",
            textDecoration: "none",
          }}
        >Edit Profile</button>
      </Menu.Item> */}
      <Menu.Item key="1" >
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
    <Layout
      theme={"light"}
      className="transparent"
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        style={{ background: '#132743' }}
        trigger={null} collapsible collapsed={collapsed}
      >
        <div className={classes.logo} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{
            backgroundColor: "transparent",
            borderRightWidth: 0,
            // fontWeight: 400,
            paddingLeft: 0,
          }}
          className="App"
        >
          <Menu.Item key="1" style={{ color: 'white' }}>
            <Link to="/app/dashboard">
              {/* <HomeOutlined style={{ fontSize: 18 }} /> */}
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <SubMenu key="sub1" title="Master Data">
            <Menu.Item key="2">
              <Link to="/app/data-supplier">
                {/* <ContainerOutlined style={{ fontSize: 18 }} /> */}
                <span>Data Supplier</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/app/data-warehouse">
                {/* <UserOutlined style={{ fontSize: 18 }} /> */}
                <span>List Gudang</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/app/data-produk">
                {/* <UserOutlined style={{ fontSize: 18 }} /> */}
                <span>Data Produk</span>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="6">
              <Link to="/app/data-transaction">
                <span>Transaction</span>
              </Link>
            </Menu.Item> */}
          </SubMenu>
          <SubMenu key="sub2" title="Barang Masuk / Keluar">
            <Menu.Item key="7">
              <Link to="/app/product-in">
                <span>Product In</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/app/product-out">
                <span>Product Out</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/app/approval">
                <span>Approval</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title="Privillage">
            <Menu.Item key="6">
              <Link to="/app/user-privillage">
                <span>Data Departemen</span>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="10">
              <Link to="/app/user">
                <span>User</span>
              </Link>
            </Menu.Item> */}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, boxShadow: '0 0 5px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
          <Row type="flex" justify="space-between">
            <Col>
              {!collapsed && <MenuFoldOutlined className={classes.hideSidebarButton} onClick={() => {
                setCollapsed(true);
              }} />}
              {collapsed && <MenuUnfoldOutlined className={classes.hideSidebarButton} onClick={() => {
                setCollapsed(false);
              }} />}

            </Col>
            <Col>
              <div className="ant-dropdown-link" href="#" style={{ color: 'grey', display: 'flex', flexDirection: 'row', height: 50 }}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <Avatar icon={<UserOutlined />} style={{ marginRight: 15, marginTop: 15 }} />
                </Dropdown>
                <p style={{ marginRight: 25 }}>Halo {localStorage.getItem("name")}</p>
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
      </Layout>
    </Layout>
  );
};
