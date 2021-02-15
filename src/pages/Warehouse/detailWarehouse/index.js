import React, { useEffect, useState } from "react";
import {
  message, Tabs, Breadcrumb, Card, PageHeader, Input, Button
} from 'antd';
// import {
//   DeleteOutlined,
// } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";
import { DetailWarehouseBarangScreen } from "./DetailBarang";
import { DetailWarehouseSuplierScreen } from "./DetailSuplier";
import { DetailWarehouseHistoryBarangScreen } from "./DetailHistoryBarang";
// import moment from "moment";


function cancel(e) {
  message.error('Anda Tidak Jadi Hapus Data Ini!');
}

export const DetailWarehouseScreen = observer((initialData) => {
  const store = useStore();
  const history = useHistory();
  const { TabPane } = Tabs;
  const { Search } = Input;
  const [filterQuery, setFilterQuery] = useState({});
  const [state, setState] = useState({
    warehouseId: '',
  });

  useEffect(() => {
    fetchData();
    return () => {
      // store.warehouse.query.pg = 1;
      // store.warehouse.query.lm = 10;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery]);

  async function fetchData() {
    await store.warehouse.getWarehouse();
    // await store.barang.getDropdown();
  }

  return <div>
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
        title={"Detail Warehouse"}
      />
      <Tabs defaultActiveKey="1" style={{marginLeft: '18px'}}>
        <TabPane tab="Barang" key="1">
          <DetailWarehouseBarangScreen />
        </TabPane>
        <TabPane tab="Supplier" key="2">
          <DetailWarehouseSuplierScreen />
        </TabPane>
        <TabPane tab="History Barang" key="3">
          <DetailWarehouseHistoryBarangScreen onChange={(val) => {
            console.log(val,'test')
          }}/>
        </TabPane>
      </Tabs>
    </Card>
  </div>
})