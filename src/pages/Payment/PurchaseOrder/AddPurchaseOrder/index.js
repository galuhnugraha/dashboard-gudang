import React, { useEffect, useState } from "react";
import {
    Input,
    Form,
    message, Breadcrumb,
    PageHeader, Card, Button, Select
} from 'antd';
import {
    PlusOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import { observer } from "mobx-react-lite";


// function handleChange(value) {
//     console.log(`selected ${value}`);
// }

export const AddPurchaseOrder = observer(() => {
    var myItem = new Array()
    var newItem = ""
    var newID = ""
    const store = useStore();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [item, setItem] = useState([]);

    // console.log(productId)
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function fetchData() {
        store.products.getAll();
        store.supliers.getSupplier();


    }

    const onFinish = values => {
        enterLoading(values);
    };

    const getQuantity = (val) => {
        newItem = val.target.value
    }

    const showItem = () => {
        const hero = store.supliers.detailData.map(r => {
            let item = {
                productName: r.product?.productName,
                quantity: r.product?.quantity,
                selfing: r.product?.selfing,
                rack: r.product?.rack
            }
            return item;
        })
        setItem(hero)
    }

    const getID = (val) => {
        newID = val
    }

    const AddItem = () => {
        const value = {
            productId: newID,
            quantity: newItem
        }
        myItem.push(value)
        form.resetFields(["quantity", 'item']);
        console.log(myItem)
        // setGetItem(value);
        // setItem(myItem)
    }

    const enterLoading = (e) => {
        setLoading(true);
        const data = {
            purchaseName: e.purchaseName,
            pic: e.pic,
            item: myItem,
            // quantity: ''
            // quantity: dataTaro.push([item])
        }
        console.log(data)
        store.purchase.AddPurchaseOrder(data).then(res => {
            setLoading(false);
            message.success('Berhasil Add Product');
            history.push("/app/purchase-order");
        }).catch(err => {
            setLoading(false);
            message.error(err.message);
        });
    }
    console.log(item)

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
                extra={[
                    <Button
                        key={"1"}
                        onClick={AddItem}
                    >
                        <PlusOutlined /> Add
                </Button>,
                ]}
            />
            <Form
                layout={'vertical'}
                name="normal_login"
                className="login-form"
                style={{ marginLeft: 23 }}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Purchase Name"
                    name="purchaseName"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your Purchase Name!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="PIC"
                    name="pic"
                    size={'large'}
                    rules={[{ required: true, message: 'Please input your PIC!' }]}
                >
                    <Input style={{ width: '98%' }} />
                </Form.Item>
                <Form.Item
                    label="Product Item"
                    name="item"
                    size={'large'}
                // rules={[{ required: true, message: 'Please input your Product Type!' }]}
                >
                    <Select
                        placeholder="Select Product"
                        style={{ width: '98%' }}
                        mode="default"
                        onChange={(value) => {
                            store.supliers.detailSuplierQuery.suplierId = value;
                            store.supliers.getSupplierProductReview();
                            showItem();
                            // setItem(value)
                            // setProductId(value)
                            getID(value)
                            // AddItem(value)
                            // setIdDetail(value)
                            // setIdDetail(value)


                        }}
                        // onClick={showItem}
                    > 
                        {store.supliers.data.map(d => <Select.Option value={d._id} key={d._id} >{d.suplierName}</Select.Option>)}
                    </Select>
                </Form.Item>
                {/* <Form.Item
                    label="Quantity"
                    name="quantity"
                    size={'large'}
                // rules={[{ required: true, message: 'Please input your Product Type!' }]}

                >
                    <Input style={{ width: '98%' }} onChange={(value) => getQuantity(value)} />
                </Form.Item> */}
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
                {/* <Button onClick={AddItem}>add</Button> */}
            </Form>
            <div>
                {/* {item && <p>Test</p>} */}
                {item.length > 0 &&
                    <h2>
                        You have unread messages.
                     </h2>
                }
            </div>
        </Card>
    </div>
})