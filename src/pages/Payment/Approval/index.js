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
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    EyeOutlined,
    PrinterOutlined
    // DownloadOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";

export const ApprovalScreen = observer(() => {
    const store = useStore();
    const history = useHistory();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = () => {
        // store.purchase.approveList();
        // store.supliers.getSupplierProductReview()
    }

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
    </div>
})