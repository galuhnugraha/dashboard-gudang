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



// function handleChange(value) {
//     console.log(`selected ${value}`);
// }

export const AddPurchaseOrder = observer(() => {
    const store = useStore();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState([]);
    const [productId, setProductId] = useState('')
    const [quantity, setQuantity] = useState([])
    const [load,setLoad] = useState('');
    console.log(productId)
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function fetchData() {
        store.products.getAll();
    }

    const onFinish = values => {
        enterLoading(values);
    };

    // const AddItem = () => {
    //     const itemData = []
    //     const value = {
    //         productId: productId[0],
    //         quantity: 0
    //     }
    //     itemData.push(value)
    //     return itemData
    // }

    // const SaveItem = () => {
    //     const myData = []
    //     const item = AddItem()
    //     const myItem  = myData.concat(item)
    //     console.log(myItem)
    // }

    const enterLoading = (e) => {
        setLoading(true);
        const dataTaro = item.map((result) => {
            let data = {
                productId: result,
                quantity: e.quantity
            }
            return data
        })
        const data = {
            purchaseName: e.purchaseName,
            pic: e.pic,
            item: dataTaro,
            // quantity: ''
            // quantity: dataTaro.push([item])
        }
        store.purchase.AddPurchaseOrder(data).then(res => {
            setLoading(false);
            message.success('Berhasil Add Product');
            history.push("/app/purchase-order");
        }).catch(err => {
            setLoading(false);
            message.error(err.message);
        });
    }


    return <div>
        <Breadcrumb>
            <Breadcrumb.Item>
                {/* Home */}
                <Link to={'/app/dashboard'}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={'/app/purchase-order'}>Purchase Order</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span style={{ color: "#132743" }}>Input Purchase Order</span>
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
                title={"Input Purchase Order"}
            />
            <Form
                layout={'vertical'}
                name="normal_login"
                className="login-form"
                style={{ marginLeft: 23 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Purchase Name"
                    name="purchaseName"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Name!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="PIC"
                    name="pic"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="Product Item"
                    name="item"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Select
                        placeholder="Select Product"
                        style={{ width: '98%' }}
                        mode="multiple"
                        onChange={(value) => {
                            setItem(value)
                            setProductId(value)
                        }}
                    >
                        {store.products.data.map(d => <Select.Option value={d._id} key={d._id}>{d.productName}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Quantity"
                    name="quantity"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Input style={{ width: '98%' }} onChange={(value) => {
                        // setItem(value)
                        setQuantity(value)
                    }}/>
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
                        loading={loading}
                    >
                        Submit
					</Button>
                </Form.Item>
            </Form>
            {/* <Button onClick={SaveItem}>add</Button> */}
        </Card>
    </div>
})