import React, { useEffect,useState } from "react";
import {
    Table,
    Space, Input, Breadcrumb,
    PageHeader, Card, Button,Modal,
    Popconfirm, message,Form
} from 'antd';
import {
    FilterOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";
import moment from "moment";

function cancel(e) {
    message.error('Click on No');
}

export const DataTransactionScreen = observer((initialData) => {
    const store = useStore();
    const [form] = Form.useForm();
    // const history = useHistory();
    const { Search } = Input;
    const [state, setState] = useState({
        success: false,
        // warehouseID: '',
    });

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function fetchData() {
        await store.transaction.getTransaction();
    }

    const setEditMode = (value) => {
        setState(prevState => ({
            ...prevState,
            success: true
        }))
        form.setFieldsValue({
            isEdit: value._id,
            success: true,
            transactionName: value.transactionName,
            pic: value.pic,
        })
    }

    const toggleSuccess = (() => {
        setState({
            success: !state.success,
        });
    })

    {
        const columns = [
            {
                title: 'Transaction Name',
                dataIndex: 'transactionName',
                key: 'transactionName',
            },
            {
                title: 'PIC',
                dataIndex: 'pic',
                key: 'pic',
            },
            {
                title: 'Created at',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (record) => moment(record).format("DD/MM/YY, H:mm:ss")
            },
            {
                title: 'Updated at',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
                render: (record) => moment(record).format("DD/MM/YY, H:mm:ss")
            },
        ];


        return <div style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    {/* Home */}
                    <Link to={'/app/dashboard'}>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span style={{ color: "#132743" }}>Data Transaction</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
                <PageHeader
                    className="card-page-header"
                    subTitle=""
                    title={"Transaction"}
                    extra={[
                        <Search
                            placeholder="Search...."
                            style={{ width: 200 }}
                            key={row => row._id}
                            onSearch={(value) => {
                                store.transaction.selectedFilterValue = value;
                                store.transaction.setPage(1);
                                // store.member.search(value);
                              }}
                              onChange={event => {
                                store.transaction.selectedFilterValue = event.target.value;
                                store.transaction.setPageDebounced();
                              }}
                        />,
                    ]}
                />
                {renderModal()}
                <Table
                    dataSource={store.transaction.data.slice()}
                    columns={columns}
                    style={{ paddingLeft: '12px' }}
                />
            </Card>
        </div>
    }

    function renderModal() {
        return <Modal visible={state.success}
            closable={false}
            confirmLoading={false}
            destroyOnClose={true} title="Update Transaction"
            okText="Save"
            cancelText="Cancel"
            bodyStyle={{ background: '#f7fafc' }}
            onCancel={() => {
                form.validateFields().then(values => {
                    form.resetFields();
                });
                toggleSuccess();
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        // editData(values);
                    })
                    .catch(info => {

                    });
            }}
        >
            <Form layout="vertical" form={form} className={'custom-form'} name="form_in_modal" initialValues={initialData}>
                <Form.Item name="isEdit" hidden={true}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Transaction Name"
                    name="transactionName"
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
            </Form>
        </Modal>
    }
})