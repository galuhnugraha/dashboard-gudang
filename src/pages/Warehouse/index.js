import React, { useEffect, useState } from "react";
import { Table, Card, Space, PageHeader, Input, Breadcrumb, Button } from 'antd';
import { observer } from "mobx-react-lite";
import { useStore } from "../../utils/useStores";
import { Link, useHistory } from 'react-router-dom';
import {
  PlusOutlined,
} from '@ant-design/icons';

export const WarehouseScreen = observer(() => {
  const store = useStore();
  const history = useHistory();
  const { Search } = Input;
  const [state, setState] = useState({
    success: false,
    warehouseId: '',
    warehouseName: ''
  });
  const [warehouse,setWarehouse] = useState("");
  const [filterQuery, setFilterQuery] = useState({});

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery]);

  async function fetchData() {
    await store.warehouse.getDataWarehouse();
  }

  const data = store.warehouse.data.map((e) => {
    return {
      _id: e._id,
      warehouseName: e.warehouseName,
      warehosueLocation: e.warehosueLocation
    }
  })


  function onDetailProduct(value) {
    // setState({warehouseId: value})
    console.log(value)
    store.warehouse.detailWarehouseQuery.warehouseId = value
    // setFilterQuery({
    //   ...filterQuery,
    //   warehouseId: state.warehouseId,
    // })
    history.push("/app/detail-warehouse/" + value)
    
  }

  function onOkFilter() {
    store.warehouse.query.warehouseId = state.warehouseId;
    setFilterQuery({
      ...filterQuery,
      warehouseId: state.warehouseId,
    })
  }

  {
    const columns = [
      {
        title: 'Warehouse Name',
        dataIndex: 'warehouseName',
        key: 'warehouseName',
        render: (value, record) => <span style={{ color: '#132743' }} onChange={(value) => {
          setState({
            warehouseId: value
          })
        }} onClick={() => {
          console.log(record._id)
          onDetailProduct(record._id)
        }}>
          {value}
        </span>
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
              <p>Delete</p>
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
          title={"Data Warehouse"}
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
          dataSource={data}
          rowKey={record => record._id}
          loading={store.warehouse.loading}
          columns={columns}
          size="small"
          style={{ paddingLeft: '12px' }}
        />
      </Card>
    </div>
  }
});