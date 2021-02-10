import React, { useEffect, useState } from "react";
import {
  message, Tabs, Breadcrumb, Card, PageHeader, Input, Button
} from 'antd';
// import {
//   DeleteOutlined,
// } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import { observer } from "mobx-react-lite";
// import moment from "moment";


function cancel(e) {
  message.error('Anda Tidak Jadi Hapus Data Ini!');
}

export const DetailWarehouseHistoryBarangScreen = observer(() => {
  const store = useStore();
  const history = useHistory();


  useEffect(() => {
    fetchData();
    return () => {
      // store.warehouse.query.pg = 1;
      // store.warehouse.query.lm = 10;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    await store.purchase.getPurchaseOrder();
    // await store.barang.getDropdown();
  }

  return <div>History Barang</div>
})