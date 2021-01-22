import React, { useEffect} from "react";
import {
  Table,
  Space,
  Popconfirm, Input,
  message, Breadcrumb,
  PageHeader, Card, Button
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../utils/useStores";
import { observer } from "mobx-react-lite";

function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

export const WarehouseScreen = observer(() => {
    const store = useStore();
    const history = useHistory();

    useEffect(() => {
        store.warehouse.getWarehouse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const { Search } = Input;

    {
        const columns = [
          {
            title: 'Warehouse Name',
            dataIndex: 'warehouseName',
            key: 'warehouseName',
          },
          {
            title: 'Warehouse Location',
            dataIndex: 'warehosueLocation',
            key: 'warehosueLocation',
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
                    onConfirm={() => {
                    //   deleteClick(record._id)
                    }}
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
              <span style={{ color: "#132743" }}>Data Warehouse</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 25, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
            <PageHeader
              className={"card-page-header"}
              subTitle=""
              title={"Warehouse"}
              extra={[
                <Search
                  placeholder="Search...."
                  style={{ width: 200 }}
                  key={row => row._id}
                />,
                <Button
                  key="1"
                  onClick={() => {
                    history.push("/app/input-warehouse")
                  }}
                >
                  <PlusOutlined /> New
              </Button>
              ]}
            />
            <Table
              rowKey={record => record._id}
              hasEmpty
              style={{ paddingLeft: '12px' }}
              size={"small"}
              columns={columns}
              dataSource={store.warehouse.data.slice()}
            />
          </Card>
        </div>
      }
})