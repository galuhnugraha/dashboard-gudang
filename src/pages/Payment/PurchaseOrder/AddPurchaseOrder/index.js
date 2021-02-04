import React, { useEffect, useState } from "react";
import {
    Input,
    Form,
    message, Breadcrumb, Popconfirm,
    PageHeader, Card, Button, Select, Table
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import { observer } from "mobx-react-lite";


export const AddPurchaseOrder = observer(() => {
    var myItem = new Array()
    // var newItem = ""
    var newID = ""
    const store = useStore();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState([]);
    const [my, setMy] = useState("");
    const [newItem, setNewItem] = useState("");
    const [filterQuery, setFilterQuery] = useState({});
    const [form] = Form.useForm();
    const [state, setState] = useState(0);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = () => {
        store.supliers.getSupplier();
        // store.supliers.getSupplierProductReview()
    }

    const onDetailProduct = async (val) => {
        // console.log(val, 'test')
        store.supliers.detailSuplierQueryItem.suplierId = val
        setFilterQuery({
            ...filterQuery,
            suplierId: val,
        })
        await store.supliers.getSupplierProductReview()
        const dataTable = store.supliers.detailData.map((e, i) => {
            let obj = {
                key: i,
                id: e.product?._id,
                productName: e.product?.productName,
                pricePerUnit: e.product?.pricePerUnit,
                quantity: e.product?.quantity,
                rack: e.product?.rack,
                sku: e.product?.sku
            }
            return obj;
        })
        setItem(dataTable)
    }

    const onFinish = values => {
        dataPost(values);
    };

    // const showItem = () => {
    //     const dataTable = store.supliers.detailData.map((e) => {
    //         let obj = {
    //             id: e.product?._id,
    //             productName: e.product?.productName,
    //             pricePerUnit: e.product?.pricePerUnit,
    //             quantity: e.product?.quantity,
    //             rack: e.product?.rack,
    //             sku: e.product?.sku
    //         }
    //         return obj;
    //     })
    //     setItem(dataTable)
    //     console.log(dataTable)
    // }





    // setState(1)
    // console.log(state)

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: () => <div>
                <Input onChange={(val) => getQuantity(val)} />
            </div>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <a>Delete</a>
                </Popconfirm>
            )
        },
    ];



    const handleDelete = (id) => {
        // const dataSource = [...state.dataTableRowDelete];
        // dataSource.filter((item) => item.id !== id);
        // // console.log(dataSource)
        // // return dataSource
        const deletedData = item.filter(item => item.key !== id)
        setItem(deletedData);
        // console.log(item);
    };

    const getQuantity = (val) => {
        // newItem = val.target.value
        setNewItem(val.target.value)
    }

    const getID = (val) => {
        newID = val
    }

    const dataPost = (e) => {
        setLoading(true);
        const item = state.dataTableRowDelete.map(r => {
            let i = {
                productId: r.id,
                quantity: newItem
            }
            return i
        })
        const data = {
            purchaseName: e.purchaseName,
            pic: e.pic,
            item: item,
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
                >
                    <Select
                        placeholder="Select Product"
                        style={{ width: '98%' }}
                        mode="default"
                        onChange={(value) => {
                            getID(value)
                            onDetailProduct(value)
                        }}
                    >
                        {store.supliers.data.map(d => <Select.Option value={d._id} key={d._id} onChange>{d.suplierName}</Select.Option>)}
                    </Select>
                </Form.Item>
                {item.length >= 1 && <Table dataSource={item} columns={columns} rowKey={record => record._id} />}
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