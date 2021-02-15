import React, { useEffect, useState } from "react";
import {
  message, Table
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = store.warehouseData.data.map((e) => {
    return {
      pic: e.transaction?.pic,
      status: e.transaction?.status,
      suplierName: e.transaction?.suplierName,
      sender: e.transaction?.sender,
      senderPhone: e.transaction?.senderPhone,
      totalPurchaseItem: e.transaction?.totalPurchaseItem,
      _id: e._id,
      // warehouseName: e.warehouse?.warehouseName
    }
  })
  console.log(data,'test')

  const columns = [
    {
      title: 'Suplier Name',
      dataIndex: 'suplierName',
      key: 'suplierName',
    },
    {
      title: 'PIC',
      dataIndex: 'pic',
      key: 'pic',
      render: (record) => <span onClick={() => {
        // console.log(record._id)
      }}>{record}</span>
    },
    {
      title: 'Sender',
      dataIndex: 'sender',
      key: 'sender',
    },
    {
      title: 'Sender Phone',
      dataIndex: 'senderPhone',
      key: 'senderPhone',
      render: (record) => <span>{record}</span>
    },
    {
      title: 'Total Purchase',
      dataIndex: 'totalPurchaseItem',
      key: 'totalPurchaseItem',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  async function fetchData() {
    await store.warehouseData.getHistoryBarang();
  }

  return <div>
    <Table
      rowKey={record => record._id}
      hasEmpty
      // style={{ paddingLeft: '12px' }}
      size={"small"}
      columns={columns}
      dataSource={data}
      loading={store.warehouseData.isLoading}
    />
  </div>
})