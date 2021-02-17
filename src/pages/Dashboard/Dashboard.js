import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
// import { useStore } from "../../utils/useStores";
// import {useCookies} from 'react-cookie'
import {
  Row, Col, Card
} from 'antd';

export const Dashboard = observer(() => {
  // const store = useStore();

  useEffect(() => {
    // store.products.getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    

  return <div className="card-page-header">
    {/* <Button onClick={fetchData}>
      <p>Test</p>
    </Button> */}
    <Row gutter={16}>
      <Col span={8}>
        <Card bordered={false}
          // className={"shadow"}
          title="Supplier"
          style={{
            // padding: 0,
            marginTop: 5,
            borderRadius: 6,
            boxShadow: '0 0 4px  0  rgba(0, 0, 0, 0.4), 0 4px 4px 0 rgba(0, 0, 0, 0.30)'
          }}
          >
          {/* <PageHeader
            className="card-page-header"
            subTitle=""
            // title={"Supplier"}
          /> */}
          <p>Test</p>
        </Card>
      </Col>
      <Col span={8}>
      <Card bordered={false}
          className={"shadow"}
          title="Data Produk"
          style={{
            // padding: 0,
            marginTop: 5,
            borderRadius: 6,
            boxShadow: '0 0 4px  0  rgba(0, 0, 0, 0.4), 0 4px 4px 0 rgba(0, 0, 0, 0.30)'
          }}
          >
          {/* <PageHeader
            className="card-page-header"
            subTitle=""
            // title={"List Gudang"}
          /> */}
          <p>Shadow</p>
        </Card>
      </Col>
      <Col span={8}>
      <Card bordered={false}
          className={"shadow"}
          title="List Gudang"
          style={{
            // padding: 0,
            marginTop: 5,
            borderRadius: 6,
            boxShadow: '0 0 4px  0  rgba(0, 0, 0, 0.4), 0 4px 4px 0 rgba(0, 0, 0, 0.30)'
          }}
          >
          {/* <PageHeader
            className="card-page-header"
            subTitle=""
            // title={"Produk"}
          /> */}
          <p>Shadow 1</p>
        </Card>
      </Col>
    </Row>
  </div>
});
