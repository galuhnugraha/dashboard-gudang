import React, { useEffect } from "react";
import { Table, Breadcrumb, PageHeader,Input, Card, Button, Space, message, Popconfirm } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../utils/useStores";
import { observer } from "mobx-react-lite";

function confirm(e) {
  console.log(e);
  message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}

export const DataSupplierScreen = observer(() => {
  const store = useStore();
  const history = useHistory();
  const { Search } = Input;

  useEffect(() => {
    store.supliers.getSupplier();
  }, []);

  {
    const columns = [
      {
        title: 'Suplier Name',
        dataIndex: 'suplierName',
        key: 'suplierName',
        fixed: 'left',
        width: 120
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
      },
      {
        title: 'Supplier Address',
        dataIndex: 'suplierAddress.address',
        key: 'suplierAddress.address',
        render: (text,record) => <span>{record.suplierAddress['address']}</span>,
      },
      {
        title: 'Supplier Phone',
        dataIndex: 'suplierPhone',
        key: 'suplierPhone',
      },
      {
        title: 'Suplier Product',
        width: 150,
        dataIndex: 'suplierProduct.productName',
        key: 'suplierProduct.productName',
        render: (text,record) => <span >{record.suplierProduct.map((e) => {
          return <p style={{width: 250}}>{e.productName}</p>
        })}</span>
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
          <span style={{ color: "#132743" }}>Data Supplier</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 25, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
        <PageHeader
          className={"card-page-header"}
          subTitle=""
          title={"Supplier"}
          extra={[
            <Search
              placeholder="Search...."
              style={{ width: 200 }}
              key={row => row._id}
            />,
            <Button
              key="1"
            >
              <PlusOutlined /> New
          </Button>
          ]}
        />
        <Table
          rowKey={record => record._id}
          hasEmpty
          style={{ paddingLeft: '12px' }}
          size={"middle"}
          columns={columns}
          scroll={{ x: 1200 }}
          dataSource={store.supliers.data.slice()}
        />
      </Card>
    </div>
  }
});
