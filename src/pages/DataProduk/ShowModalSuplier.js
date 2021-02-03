import React, { useEffect, useState } from "react";
import {
    Table,
    Space,
    Popconfirm, Input,
    Form, Modal,
    Row, Col,
    message, Breadcrumb,
    PageHeader, Card, Button, Select
} from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    FilterOutlined,
    MinusOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../utils/useStores";
import { observer } from "mobx-react-lite";


export const ShowModalSupliers = observer(({ visible, onSubmit, onCancel, confirmLoading, initialData, menu, onDelete, users }) => {
    const [form] = Form.useForm();
    const store = useStore();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
      async function fetchData() {
        await store.supliers.getSupplier();
        // await store.supliers.getSupplierProduct();
      }


    return <Modal
        title="Detail Suplier"
        visible={visible}
        onCancel={onCancel}
        footer={null}
    >
        <Form
            name="basic"
            layout="vertical"
            className={'custom-form'} name="form_in_modal"
            form={form}
        >
             <Form.Item
              label="Supliers Address"
              name="suplierAddress"
              size={'large'}
              rules={[{ required: true, message: 'Please input your Product Type!' }]}
            >
              <Input style={{ width: '98%' }} />
            </Form.Item>
            <Form.Item label="Supliers Phone" name="suplierPhone" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Company Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
        </Form>
    </Modal>
})