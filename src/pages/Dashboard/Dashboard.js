import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../utils/useStores";
import { Button,
} from 'antd';

export const Dashboard = observer(() => {
  const store = useStore();

  useEffect(() => {
    // store.products.getAll();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function fetchData() {
    store.user.getTest()
  }

  return <div className="card-page-header">
    <Button onClick={fetchData}>
      <p>Test</p>
    </Button>
    {/* <Row gutter={16}>
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
    </Row> */}
  </div>
});
