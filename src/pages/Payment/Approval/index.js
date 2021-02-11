import React, { useEffect, useState } from "react";
import {
    Table,
    Space,
    Popconfirm, Input,
    Form, Modal,
    message, Breadcrumb,
    PageHeader, Card, Button,
} from 'antd';
import {
    CheckOutlined
    // DownloadOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";

export const ApprovalScreen = observer(() => {
    const store = useStore();
    const history = useHistory();
    const [form] = Form.useForm();
    // const [filterProduct, setFilterProduct] = useState(false);
    const [productId, setProductId] = useState('');
    const [state, setState] = useState({
        success: false,
    });

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCancel = () => {
        // setIsModalVisible(false);
        form.validateFields().then(values => {
            form.resetFields();
        });
        toggleSuccessReview();
    };

    function ModalItemPurchase() {
        return <Modal
            title={"Form Product In"}
            visible={state.success}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        // editDetailPurchase(values);
                        onFinish(values)
                    })
                    .catch(info => {
                    });
            }}
            onCancel={handleCancel}
        >
            <Form layout="vertical" form={form} className={'custom-form'} name="form_in_modal">
                <Form.Item
                    label="Atasan"
                    name="upperPic"
                    size={'large'}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    size={'large'}
                // rules={[{ required: true, message: 'Please input your Atasan' }]}
                >
                    <Input.Password type="password" />
                </Form.Item>
            </Form>
        </Modal>
    }

    const fetchData = () => {
        store.receive.approveList();
    }

    const setEditModeReviewPurchase = (value) => {
        setState(prevState => ({
            ...prevState,
            success: true
        }))
        form.setFieldsValue({
            success: true,
        })
    }

    const toggleSuccessReview = (() => {
        setState({
            success: !state.success,
        });
    })

    const onFinish = values => {
        dataPost(values);
    };

    const dataPost = (e) => {
        // setLoading(true);
        const data = {
            purchaseId: productId,
            upperPic: e.upperPic,
            password: e.password,

        }
        store.purchase.approve(data).then(res => {
            // setLoading(false);
            message.success('Berhasil Approve');
            history.push("/app/product-in");
            fetchData()
        }).catch(err => {
            // setLoading(false);
            message.error(err.message);
        });
    }


    const columns = [
        {
            title: 'Suplier Name',
            dataIndex: 'suplierName',
            key: 'suplierName',
        },
        {
            title: 'Sender Phone',
            dataIndex: 'senderPhone',
            key: 'senderPhone',
        },
        {
            title: 'Sender',
            dataIndex: 'sender',
            key: 'sender',
        },
        {
            title: 'Total Purchase',
            dataIndex: 'totalPurchaseItem',
            key: 'totalPurchaseItem',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        console.log(record)
                        setProductId(record.id)
                        setEditModeReviewPurchase(true)
                    }}>
                        Approval
                    </a>
                </Space>
            ),
        }
    ];

    return <div>
        <Breadcrumb>
            <Breadcrumb.Item>
                {/* Home */}
                <Link to={'/app/dashboard'}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span style={{ color: "#132743" }}>Approval</span>
            </Breadcrumb.Item>
        </Breadcrumb>
        {ModalItemPurchase()}
        <Table dataSource={store.receive.data.slice()} columns={columns} />
    </div>
})