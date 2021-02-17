import React, { useEffect, useState } from "react";
import {
    Table,
    Space,Input,
    Form, Modal,
    message, Breadcrumb,
    PageHeader, Card
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";

export const ApprovalScreen = observer(() => {
    const store = useStore();
    const history = useHistory();
    const [form] = Form.useForm();
    const { Search } = Input;
    const [purchaseId, setPurchaseId] = useState('');
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
            purchaseId: purchaseId,
            upperPic: e.upperPic,
            password: e.password,

        }
        store.purchase.approve(data).then(res => {
            message.success('Berhasil Approve');
            history.push("/app/product-in");
            fetchData()

        }).catch(err => {
            if (err) {
                store.purchase.approve2(data).then(res => {
                    message.success('Berhasil Approve');
                    history.push("/app/product-in");
                    fetchData()

                })
            }
            // setLoading(false);
            // message.error(err.message);
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
                    <span onClick={() => {
                        console.log(record._id)
                        setPurchaseId(record._id)
                        setEditModeReviewPurchase(true)
                    }}>
                        Approval
                    </span>
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
        <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 25, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
            <PageHeader
                className={"card-page-header"}
                subTitle=""
                title={"Approval"}
                extra={[
                    <Search
                        placeholder="Search...."
                        style={{ width: 200 }}
                        key={row => row._id}
                    />
                ]}
            />
            {ModalItemPurchase()}
            <Table dataSource={store.receive.data.slice()} columns={columns} size="small" style={{paddingLeft:'12px'}}/>
        </Card>
    </div>
})