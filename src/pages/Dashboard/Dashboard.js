import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../utils/useStores";
import {useCookies} from 'react-cookie'
import {
  Row, Col, Card,PageHeader,Button
} from 'antd';
import Cookies from 'universal-cookie';
export const Dashboard = observer(() => {
  const store = useStore();
  const [cookies, setCookie] = useCookies(['name']);

  useEffect(() => {
    // store.products.getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function fetchData() {
    store.user.getTest()
    // setCookie('Token', "rahasia rahasia", { path: '/' });
  }
    

  return <div className="card-page-header">
    {/* <Button onClick={fetchData}>
      <p>Test</p>
    </Button> */}
    <Row gutter={16}>
      <Col span={8}>
        <Card bordered={false}
          className={"shadow"}
          bodyStyle={{
            padding: 0,
            marginTop: 10,
            borderRadius: 10,
            boxShadow: '0 0 5px  0  rgba(0, 0, 0, 0.4), 0 5px 5px 0 rgba(0, 0, 0, 0.15)'
          }}>
          <PageHeader
            className="card-page-header"
            subTitle=""
            // title={"Supplier"}
          />
        </Card>
      </Col>
      <Col span={8}>
      <Card bordered={false}
          className={"shadow"}
          bodyStyle={{
            padding: 0,
            marginTop: 10,
            borderRadius: 10,
            boxShadow: '0 0 5px  0  rgba(0, 0, 0, 0.4), 0 5px 5px 0 rgba(0, 0, 0, 0.15)'
          }}>
          <PageHeader
            className="card-page-header"
            subTitle=""
            // title={"List Gudang"}
          />
        </Card>
      </Col>
      <Col span={8}>
      <Card bordered={false}
          className={"shadow"}
          bodyStyle={{
            padding: 0,
            marginTop: 10,
            borderRadius: 10,
            boxShadow: '0 0 5px  0  rgba(0, 0, 0, 0.4), 0 5px 5px 0 rgba(0, 0, 0, 0.15)'
          }}>
          <PageHeader
            className="card-page-header"
            subTitle=""
            // title={"Produk"}
          />
        </Card>
      </Col>
    </Row>
  </div>
});
