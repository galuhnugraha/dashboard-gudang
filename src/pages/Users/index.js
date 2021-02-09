import React, { useEffect } from "react";
import { Form, Input, Breadcrumb, message, PageHeader, Card, Button,Table } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../utils/useStores";
import {
  PlusOutlined,
} from '@ant-design/icons';
import { observer } from "mobx-react-lite";

export const DataUserScreen = observer(() => {
  const { Search } = Input;
  const history = useHistory()

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
    },
    {
      title: 'Role',
    },
    {
      title: 'Action',
    },
  ];

  return <div>
    <Breadcrumb>
      <Breadcrumb.Item>
        {/* Home */}
        <Link to={'/app/dashboard'}>Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span style={{ color: "#132743" }}>User Privillage</span>
      </Breadcrumb.Item>
    </Breadcrumb>
    <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
      <PageHeader
        className="card-page-header"
        subTitle=""
        title={"Users"}
        extra={[
          <Search
            placeholder="Search...."
            style={{ width: 200 }}
            // key={row => row._id}
          />,
          <Button
            key={"1"}
            onClick={() => {
              history.push("/app/input-user-privillage")
            }}
          >
            <PlusOutlined /> New
          </Button>,
        ]}
      />
      <Table  columns={columns} hasEmpty style={{marginLeft: '12px'}}/>
    </Card>
  </div>
})