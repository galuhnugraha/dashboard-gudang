import React, { useEffect } from "react";
import {
    Row, Col, Card, Table
} from 'antd';
// import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import { observer } from "mobx-react-lite";
import moment from 'moment';
import Cookies from 'universal-cookie';

export const DetailProductInScreen = observer(() => {
    const store = useStore();
    // const history = useHistory();
    const cookie = new Cookies();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function fetchData() {
        // store.purchase.getPurchaseOrderList();
        store.purchase.getPurchaseOrderListDetail();
        // store.purchase.getPurchaseOrderDetail();
    }

    let table = '';

    table = store.purchase.dataDetailObject;

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            upperPic1: table.upperPic1?.UserName,
            upperPic2: table.upperPic2?.UserName,
        },
    ];

    const columnsReview = [
        {
            title: 'Di input oleh ',
            dataIndex: 'pic',
            render: (record) => <span>
                <h3>{cookie.get("name")}</h3>
                <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
            </span>
        },
        {
            title: 'Kepala Gudang',
            colSpan: 2,
            dataIndex: 'upperPic1',
            key: 'upperPic1',
            render: (value, text, index) => <span>
                <p>{value}</p>
                <p>{moment(table.assignmentUpperPicTime1).format('MMMM Do YYYY')}</p>
            </span>
        },
        {
            title: 'Phone',
            colSpan: 0,
            dataIndex: 'upperPic2',
            render: (value, text, index) => <span>
            <p>{value}</p>
            <p>{moment(table.assignmentUpperPicTime2).format('MMMM Do YYYY')}</p>
        </span>
        }
    ];

    const columns = [
        {
            title: 'Kode Barang',
            dataIndex: 'sku',
            key: 'sku',
            render: (record) => <span>
                {/* {record[0]?.sku} */}
                {record}
            </span>
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            render: (record) => <span>
                {/* {record[0]?.productName} */}
                {record}
            </span>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (record) => <span>
                {/* {record[0]?.quantity} */}
                {record}
            </span>
        },
        {
            title: 'Keterangan',
            dataIndex: 'description',
            key: 'description',
            render: (record) => <span>
                {/* {record[0]?.description} */}
                {record}
            </span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (record) => <span>
                {/* {record[0]?.status} */}
                {record}
            </span>
        },
    ];

    return <div>
        <Card
            bordered={false}
            className={"shadow"}
            loading={store.purchase.isLoading}
            bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 5, boxShadow: '0 0 3px  0  rgba(0, 0, 0, 0.2), 0 3px 3px 0 rgba(0, 0, 0, 0.10)' }}
        >
            {/* <PageHeader
                className={"card-page-header"}
                subTitle=""
                title={"Input Product In"}
            /> */}
            <div style={{ marginTop: 25 }}>
                <div style={{ display: 'flex', justifyContent: 'center',flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <h1>Detail Form Barang Masuk</h1>
                    {/* <Button style={{marginToButton: 8,marginLeft: 8}}><PrinterOutlined /></Button> */}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>No : {table.noref}</p>
                </div>
            </div>
            <div style={{ marginLeft: 10 }}>
                <Row type="flex" justify="space-between">
                    <Col style={{ marginLeft: '12px' }}>
                        <Row>
                            <p>Suplier : {table.suplierName}</p>
                        </Row>
                        <div style={{ marginTop: 8 }}>
                            <p>Alamat  : {table.suplierId?.suplierAddress.address}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ marginRight: 55, marginTop: 10 }}>
                            <p>Tanggal : {moment().format('MMMM Do YYYY')}</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <Table dataSource={table.item} columns={columns} style={{ paddingLeft: '12px', marginTop: '10px' }}
                size="small"  rowKey={row => row._id} pagination={false}/>
            <Row type="flex" justify="space-between">
                <Col>
                    <div style={{ marginTop: 35, marginLeft: 23 }}>
                        <p>Pengirim  : {table.sender}</p>
                    </div>
                    <div style={{ marginTop: 25, marginLeft: 23 }}>
                        <p>No Telepon  : {table.senderPhone}</p>
                    </div>
                </Col>
                <Col style={{ marginRight: 45,marginTop: 25,marginBottom: 20}}>
                    <Table columns={columnsReview} dataSource={dataSource} bordered pagination={false} />
                </Col>
            </Row>
        </Card>
    </div>
})