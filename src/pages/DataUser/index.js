import React, { useEffect } from "react";
import { Table, Space, Popconfirm, message, Breadcrumb, PageHeader, Card, Button } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useStore } from "../../utils/useStores";
import { observer } from "mobx-react-lite";
import moment from "moment";

function confirm(e) {
  console.log(e);
  message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}

// const { Search } = Input;

export const DataUserScreen = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.user.getAll();
    store.user.setPage(1);
    store.user.setCurrentPage(10);
  }, [])

  {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'UserName',
        key: 'UserName',
      },
      {
        title: 'Tanggal Lahir',
        dataIndex: 'birthDate',
        key: 'birthDate',
        render: (text, record) => <span>{moment(text).format('DD-MM-YYYY')}</span>,
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

    return <div style={{ paddingLeft: 10, paddingRight: 10 }}>
      <Breadcrumb>
        <Breadcrumb.Item>
          {/* Home */}
          <Link to={'/app/dashboard'}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ color: "#132743" }}>Data User</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 25, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
        <PageHeader
          className={"card-page-header"}
          subTitle=""
          title={"User"}
          extra={[
            <Button
              key="1"
            >
              <PlusOutlined /> New
            </Button>,
          ]}
        />
        <Table
          rowKey={record => record.email}
          hasEmpty
          style={{ paddingLeft: '12px' }}
          size={"small"}
          columns={columns}
          dataSource={store.user.data.slice()}
          pagination={{
            total: store.user.maxLength,
            onShowSizeChange: (current, pageSize) => {
              store.user.setCurrentPage(pageSize);
            }
          }}
          loading={store.user.isLoading}
          onChange={(page) => {
            store.user.setPage(page.current);
          }}
          current={store.user.currentPage}
        />
      </Card>
    </div>
  }
});
