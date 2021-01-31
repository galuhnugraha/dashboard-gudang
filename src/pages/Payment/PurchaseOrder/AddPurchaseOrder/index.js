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
import { FormInstance } from 'antd/lib/form';


// function handleChange(value) {
//     console.log(`selected ${value}`);
// }

export const AddPurchaseOrder = observer(() => {
    var myItem = []
    var newItem = []
    const store = useStore();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState([]);
    const [productId, setProductId] = useState('')
    const [form] = Form.useForm();
    const [quncy , setQuantity] = useState('')
    const { Option } = Select;
    const [state, setState] = useState({
        success: false,
        item: '',
        quantity: ''
    });

    // console.log(productId)
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

    const getQuantity = (val) => {
        setQuantity(val.target.value)
        myItem.push(val.target.value)
    }

    const AddItem = () => {
            const value = {
                productId: productId,
                quantity: quncy
            }
        myItem.push(value)
        console.log(quncy.target.value)
        // form.resetFields();
    }

    console.log(myItem)
    const enterLoading = (e) => {
        setLoading(true);
        const dataTaro = item.map((result) => {
            // let data = {
            //     productId: result,
            //     quantity: e.quantity
            // }
            // return data
            const value = {
                productId: result,
                quantity: e.quantity
            }
            myItem.push(value)
            return value
        })
        const data = {
            purchaseName: e.purchaseName,
            pic: e.pic,
            item: dataTaro,
            // quantity: ''
            // quantity: dataTaro.push([item])
        }
        console.log(data)
        // store.purchase.AddPurchaseOrder(data).then(res => {
        //     setLoading(false);
        //     message.success('Berhasil Add Product');
        //     history.push("/app/purchase-order");
        // }).catch(err => {
        //     setLoading(false);
        //     message.error(err.message);
        // });
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
            {/* <Form  form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item name="note" label="Note" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Form> */}
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
                        mode="default"
                        onClick={(value) => {
                            // setItem(value)
                            setProductId(value)
                            // AddItem(value)
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
                    <Input style={{ width: '98%' }}  onChange={(value) => getQuantity(value)}/>
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
        </Card>
        <Button onClick={AddItem}>add</Button>
    </div>
})