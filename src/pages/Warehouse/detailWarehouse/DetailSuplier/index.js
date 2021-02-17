import React, { useEffect } from "react";
import {Table
} from 'antd';
// import {
//   DeleteOutlined,
// } from '@ant-design/icons';
// import {useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import { observer } from "mobx-react-lite";
// import moment from "moment";


export const DetailWarehouseSuplierScreen = observer(() => {
  const store = useStore();
  // const history = useHistory();


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    await store.warehouseData.getHistoryBarang();
  }

  const data = store.warehouseData.data.map((e) => {
    return {
      suplierName: e.suplier?.suplierName,
      suplierPhone: e.suplier?.suplierPhone,
      suplierAddress: e.suplier?.suplierAddress.address,
      _id: e._id,
      // warehouseName: e.warehouse?.warehouseName
    }
  })

  const columns = [
    {
      title: 'Suplier Name',
      dataIndex: 'suplierName',
      key: 'suplierName',
    },
    {
      title: 'Suplier Phone',
      dataIndex: 'suplierPhone',
      key: 'suplierPhone',
    },
    {
      title: 'Address',
      dataIndex: 'suplierAddress',
      key: 'suplierAddress',
    },
  ];


  return <div>
    <Table dataSource={data} columns={columns} hasEmpty rowKey={row => row._id}/>
  </div>
})