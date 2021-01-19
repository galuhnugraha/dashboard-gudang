import React from "react";
import { Table, Space, Popconfirm, message,Input} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

function confirm(e) {
  console.log(e);
  message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}

const { Search } = Input;

export const DataUserScreen = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tanggal Lahir',
      dataIndex: 'birthDate',
      key: 'birthDate',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
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
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      birthDate: '20-01-1999',
      email: 'New York No. 1 Lake Park',
      phone: '0999988990'
    },
    {
      key: '2',
      name: 'Jim Green',
      birthDate: '20-01-1999',
      email: 'New York No. 1 Lake Park',
      phone: '0999988990'
    },
    {
      key: '3',
      name: 'Joe Black',
      birthDate: '20-01-1999',
      email: 'New York No. 1 Lake Park',
      phone: '0999988990'
    },
  ];


  return <div>
    {/* <Typography.Title level={5} style={{ marginTop: 8 }}>Data User</Typography.Title> */}
    <div
      style={{
        display: "flex",
        justifyContent: 'flex-end'
      }}>
        <Search placeholder="Search....."  enterButton style={{ width: 200, marginTop: 25 }}/>
    </div>
    <Table
      columns={columns}
      dataSource={data}
      bordered={true}
      style={{ marginTop: 20 }}
    />
  </div>
};
