import React, { useContext, useState, useEffect, useRef } from "react";
import {
    Input,
    Form,
    message, Breadcrumb,
    PageHeader, Card, Button, Select, Popconfirm, Table
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import { observer } from "mobx-react-lite";


// function handleChange(value) {
//     console.log(`selected ${value}`);
// }

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

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};

const EditableContext = React.createContext(null);

export const AddPurchaseOrder = observer(() => {
    var myItem = new Array()
    const store = useStore();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState([]);
    const [state, setState] = useState({
        dataSource: [
            {
                key: '0',
                name: 'Edward King 0',
                age: '32',
                address: 'London, Park Lane no. 0',
            },
            {
                key: '1',
                name: 'Edward King 1',
                age: '32',
                address: 'London, Park Lane no. 1',
            },
        ],
    })
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const tableData = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'age',
            dataIndex: 'age',
        },
        {
            title: 'address',
            dataIndex: 'address',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
                state.dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    const columns = tableData.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        };
    });


    function fetchData() {
        store.supliers.getSupplier();
        store.supliers.getSupplierProductReview();
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

    const handleDelete = (key) => {
        const dataSource = [...state.dataSource];
        setState({
            dataSource: dataSource.filter((item) => item.key !== key),
        });
    };

    const handleSave = (row) => {
        const newData = [...state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setState({
            dataSource: newData,
        });
    };

    // const enterLoading = (e) => {
    //     setLoading(true);
    //     const data = {
    //         purchaseName: e.purchaseName,
    //         pic: e.pic,
    //         item: myItem,
    //         // quantity: ''
    //         // quantity: dataTaro.push([item])
    //     }
    //     console.log(data)
    //     store.purchase.AddPurchaseOrder(data).then(res => {
    //         setLoading(false);
    //         message.success('Berhasil Add Product');
    //         history.push("/app/purchase-order");
    //     }).catch(err => {
    //         setLoading(false);
    //         message.error(err.message);
    //     });
    // }


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
                    <Button style={{ backgroundColor: '#132743', color: 'white', borderRadius: 5 }}
                        block
                        htmlType="submit"
                        size={'large'}
                        loading={loading}
                    >
                        Submit
                </Button>
                ]}
            />
            <Form
                layout={'vertical'}
                name="normal_login"
                className="login-form"
                style={{ marginLeft: 23 }}
                form={form}
            // onFinish={onFinish}
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
                        }}
                    >
                        {store.supliers.data.map(d => <Select.Option value={d._id} key={d._id}>{d.suplierName}</Select.Option>)}
                    </Select>
                </Form.Item>
                {item.length > 0 && <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    style={{ width: '98%' }}
                    dataSource={state.dataSource}
                    columns={columns}
                />}
                <Form.Item
                    style={{
                        marginBottom: 25,
                        width: 100
                    }}>
                </Form.Item>
            </Form>
        </Card>

    </div >
})