import React, { useEffect, useState } from "react";
import {
  message, Tabs,Table, Breadcrumb, Card, PageHeader, Input, Button
} from 'antd';
// import {
//   DeleteOutlined,
// } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import { observer } from "mobx-react-lite";
// import moment from "moment";


export const DetailWarehouseSuplierScreen = observer(() => {

  const columns = [
    {
      title: 'Suplier Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Company Name',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Supliers Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Supliers Phone',
      dataIndex: 'address',
      key: 'address',
    },
  ];


  return <div>
    <Table columns={columns} hasEmpty/>
  </div>
})