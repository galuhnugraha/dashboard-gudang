import React, { useEffect, useState } from "react";
import {
    Input,
    Form,
    message, Breadcrumb,
    PageHeader, Card, Button, Select
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import { observer } from "mobx-react-lite";


export const ReceiveScreen = observer(() => {
    const store = useStore();
    const history = useHistory();
    const [item, setItem] = useState([]);
    const [productId , setProductId] = useState('')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function fetchData() {
        await store.purchase.getPurchaseOrder();
    }

    const onFinish = values => {
        enterLoading(values);
    };


    const enterLoading = (e) => {
        setLoading(true);
        const data = {
            pic: e.pic,
            purchaseId: e.purchaseId[0]
        }
        store.receive.AddReceive(data).then(res => {
            setLoading(false);
            message.success('Berhasil Add Receive');
            history.push("/app/recive");
        }).catch(err => {
            setLoading(false);
            message.error(err.message);
        });
    }

    // const data = store.purchase.data.map((e) => {
    //     console.log(e.purchaseName , )
    //     let item = {
    //         purchaseId: e._id
    //     }
    //     return item;
    // })
    // console.log(data)

    return <div>
        <Breadcrumb>
            <Breadcrumb.Item>
                {/* Home */}
                <Link to={'/app/dashboard'}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span style={{ color: "#132743" }}>Input Receive</span>
            </Breadcrumb.Item>
        </Breadcrumb>
        <Card
            bordered={false}
            className={"shadow"}
            bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 5, boxShadow: '0 0 3px  0  rgba(0, 0, 0, 0.2), 0 3px 3px 0 rgba(0, 0, 0, 0.10)' }}
        >
            <PageHeader
                className={"card-page-header"}
                subTitle=""
                title={"Input Receive"}
            />
            <Form
                layout={'vertical'}
                name="normal_login"
                className="login-form"
                style={{ marginLeft: 23 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="PIC"
                    name="pic"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Name!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="Purchase Order"
                    name="purchaseId"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Select
                        placeholder="Select Product"
                        style={{ width: '98%' }}
                        mode="multiple"
                        // onChange={(value) => {
                        //     setItem(value)
                        //     setProductId(value)
                        // }}
                    >
                        {store.purchase.data.map(d => <Select.Option value={d._id} key={d._id}>{d.purchaseName}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    style={{
                        marginBottom: 25,
                        width: 100
                    }}>
                    <Button style={{ backgroundColor: '#132743', color: 'white', borderRadius: 5 }}
                        block
                        htmlType="submit"
                        size={'large'}
                        // loading={loading}
                    >
                        Submit
					</Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
})