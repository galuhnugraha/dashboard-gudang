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


const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};


export const AddPurchaseOrder = observer(() => {
    var myItem = new Array()
    // var newItem = ""
    var newID = ""
    const store = useStore();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [filterQuery, setFilterQuery] = useState({});
    const [dataSource, setDataSource] = useState([]);
    const [id, setId] = useState("");
    const [state, setState] = useState({
        dataSource: [],
    })
    const [form] = Form.useForm();
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function fetchData() {
        store.supliers.getSupplier();
        store.supliersItem.getSupplierProductReview();
    }

    const onDetailProduct = (val) => {
        // console.log(val, 'test')
        store.supliers.detailSuplierQueryItem.suplierId = val
        store.supliers.getSupplierProductReview()
        setFilterQuery({
            ...filterQuery,
            suplierId: val,
        })
    }

    const onFinish = values => {
        enterLoading(values);
    };

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
        // console.log(myItem)
        setItem(hero)
    }

    const dataTable = store.supliers.detailData.map((e) => {
        let obj = {
            key: e.length,
            productName: e.product?.productName,
            pricePerUnit: e.product?.pricePerUnit,
            quantity: e.product?.quantity,
            rack: e.product?.rack,
            sku: e.product?.sku,
            id: e.product?._id
        }
        return obj;
    })

    const columns = [
        {
            title: 'name',
            dataIndex: 'productName',
            key: 'productName'
        },
        {
            title: 'age',
            dataIndex: 'age',
            key: '2',
        },
        {
            title: 'address',
            dataIndex: 'address',
            key: '3',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
                dataTable.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => {
                        setId(record.id)
                        const key = dataTable.findIndex(getIndex)
                        console.log(key)
                        handleDelete(key)
                        }}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    function getIndex(val) {
        console.log(val.id ,':', id)
       return val.id == id
    }

    // const columns = [
    //     {
    //         title: 'Product Name',
    //         dataIndex: 'productName',
    //         key: 'productName',
    //     },
    //     {
    //         title: 'Quantity',
    //         dataIndex: 'quantity',
    //         key: 'quantity',
    //         render: () => <div>
    //             <Input onChange={(val) => getQuantity(val)} />
    //         </div>
    //     },
    //     {
    //         title: 'Operation',
    //         dataIndex: 'operation',
    //         render: (_, record) =>
    //             item.length >= 1 ? (
    //                 <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
    //                     <a>Delete</a>
    //                 </Popconfirm>
    //             ) : null,
    //     }
    // ];

    const handleDelete = (id) => {
        const dataSource = [...dataTable];
        dataTable.splice(id, 1);
        console.log(id)
        console.log(dataSource)
        // setState({ dataSource });
    }

    // const onDelete = (key) => {
    //     const dataSource = [...state.dataSource]
    //     const dataDelete = dataSource.splice(0,-1).filter((item) => item.key !== key)
    //     setDataSource(dataDelete)
    // }

    const getQuantity = (val) => {
        // newItem = val.target.value
        setNewItem(val.target.value)
    }

    const getID = (val) => {
        newID = val
    }

    const enterLoading = (e) => {
        setLoading(true);
        // const value = {
        //     productId: newID,
        //     quantity: newItem
        // }

        const item = dataTable.map(r => {
            let i = {
                productId: r.id,
                quantity: newItem
            }
            console.log(i)
            return i
        })

        // myItem.push(item)
        // console.log(myItem, 'data post')
        const data = {
            purchaseName: e.purchaseName,
            pic: e.pic,
            item: item,
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
                            showItem(value)
                            getID(value)
                            onDetailProduct(value)
                        }}
                    >
                        {store.supliers.data.map(d => <Select.Option value={d._id} key={d._id} onChange>{d.suplierName}</Select.Option>)}
                    </Select>
                </Form.Item>
                {dataTable.length > 0 && <Table dataSource={dataTable} rowClassName={() => 'editable-row'} columns={columns} rowKey={record => record._id} />}
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