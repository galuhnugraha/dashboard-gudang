import React from "react";
import { Table, Breadcrumb, PageHeader, Card, Button, Space, message, Popconfirm } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

function confirm(e) {
  console.log(e);
  message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}

export const DataSupplierScreen = () => {
  const columns = [
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
    },
    { title: 'Column 1', dataIndex: 'address', key: '1' },
    { title: 'Column 2', dataIndex: 'address', key: '2' },
    { title: 'Column 3', dataIndex: 'address', key: '3' },
    { title: 'Column 4', dataIndex: 'address', key: '4' },
    { title: 'Column 5', dataIndex: 'address', key: '5' },
    { title: 'Column 6', dataIndex: 'address', key: '6' },
    { title: 'Column 7', dataIndex: 'address', key: '7' },
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '150px',
      render: () => {
        return (
          <div>
            <Space size="middle">
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                  <EditOutlined />
                </div>
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <div style={{ marginLeft: 8 }}>
                    <DeleteOutlined />
                  </div>
                </Popconfirm>
              </div>
            </Space>
          </div>
        )
      },
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 40,
      address: 'London Park',
    },
  ];

  return <div style={{ paddingLeft: 10, paddingRight: 10 }}>
    <Breadcrumb>
      <Breadcrumb.Item>
        {/* Home */}
        <Link to={'/app/dashboard'}>Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span style={{ color: "#132743" }}>Data Supplier</span>
      </Breadcrumb.Item>
    </Breadcrumb>
    <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 25, borderRadius: 5, boxShadow: '0 0 3px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
      <PageHeader
        className={"card-page-header"}
        subTitle=""
        title={"Supplier"}
        extra={[
          <Button
            key="1"
          >
            <PlusOutlined /> New
            </Button>,
        ]}
      />
      <Table
        key="1"
        scroll={{ x: 1200 }}
        hasEmpty
        size="middle"
        style={{paddingLeft: '12px'}}
        columns={columns}
        dataSource={data}
        
      />
    </Card>
  </div>
};
