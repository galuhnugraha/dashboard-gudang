import React, { useEffect, useState } from "react";
import {
    Row, Col, Card, Button, Select
} from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    EyeOutlined,
    PrinterOutlined,
    FilterOutlined
    // DownloadOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import { observer } from "mobx-react-lite";
import moment from 'moment';

export const DetailProductInScreen = observer(() => {
    const store = useStore();
    const history = useHistory();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function fetchData() {
        store.purchase.getPurchaseOrderList();
    }

    const dataReview = store.purchase.data.map((e) => {
        let dataPurchase = {
            _id: e._id,
            invoiceNo: e.invoiceNo,
            suplierName: e.suplierName,
            senderPhone: e.senderPhone,
            pic: e.pic?.UserName,
            noref: e.noref,
            totalPurchaseItem: e.totalPurchaseItem,
            status: e.status
        }
        return dataPurchase
    })
    console.log(dataReview,'yes')

    return <div>
        <Card
            bordered={false}
            className={"shadow"}
            bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 5, boxShadow: '0 0 3px  0  rgba(0, 0, 0, 0.2), 0 3px 3px 0 rgba(0, 0, 0, 0.10)' }}
        >
            {/* <PageHeader
                className={"card-page-header"}
                subTitle=""
                title={"Input Product In"}
            /> */}
            <div style={{ marginTop: 25 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <h1>Detail Form Barang Masuk</h1>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>No : </p>
                </div>
            </div>
            <div style={{ marginLeft: 10 }}>
                <Row type="flex" justify="space-between">
                    <Col style={{ marginLeft: '12px' }}>
                        <Row>
                            <p>Suplier : </p>
                        </Row>
                        <div style={{ marginTop: 25 }}>
                            <p>Alamat  : </p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ marginRight: 55, marginTop: 10 }}>
                            <p>Tanggal : {moment().format('MMMM Do YYYY')}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </Card>
    </div>
})