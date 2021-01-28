import React, { useEffect } from "react";
import { Row, Col, Collapse } from 'antd';
import { observer } from "mobx-react-lite";
import { useStore } from "../../utils/useStores";

export const Dashboard = observer(() => {
  const store = useStore();
  const { Panel } = Collapse;

  useEffect(() => {
    store.products.getAll();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className="card-page-header">
    <Row gutter={16}>
      <Col span={12}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Data Supplier" key="1">
            <p>0</p>
          </Panel>
        </Collapse>
      </Col>
      <Col span={12}>
        <Collapse defaultActiveKey={['2']}>
          <Panel header="Data Product" key="2">
            <p>{store.products.maxLength}</p>
          </Panel>
        </Collapse>
      </Col>
    </Row>

  </div>
});
