import React, { useEffect, useState } from "react";
import {
    Row, Col, Card, Table
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import { observer } from "mobx-react-lite";
import moment from 'moment';
import Cookies from 'universal-cookie';

export const DetailProductInScreen = observer(() => {
    const store = useStore();
    const history = useHistory();
    const cookie = new Cookies();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function fetchData() {
        store.purchase.getPurchaseOrderList();
        // store.purchase.getPurchaseOrderDetail();
    }

    const dataReview = store.purchase.data.map((e) => {
        let dataPurchase = {
            _id: e._id,
            invoiceNo: e.invoiceNo,
            suplierName: e.suplierName,
            suplierAddress: e.suplierId?.suplierAddress,
            sender: e.sender,
            senderPhone: e.senderPhone,
            // pic: cookie.get("name"),
            upperPic1: e.upperPic1?.UserName,
            upperPic2: e.upperPic2?.UserName,
            noref: e.noref,
            item: e.item.map((e) => {
                return {
                    sku: e.sku,
                    description: e.description,
                    productName: e.productName,
                    quantity: e.quantity,
                    status: e.status
                }
            }),
            totalPurchaseItem: e.totalPurchaseItem,
            status: e.status
        }
        return dataPurchase
    })
    console.log(dataReview)

    function FilterProduct(value) {
        // console.log(value.UserName)
        return value._id
    }
    const selectedDataProduct = dataReview.filter(FilterProduct);
    // console.log(selectedDataProduct[0]?.UserName);

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            upperPic1: selectedDataProduct[0]?.upperPic1,
            upperPic2: selectedDataProduct[0]?.upperPic2,
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
            dataIndex: 'UserName',
            key: 'UserName',
            render: (value, text, index) => <span>
                <p>{value}</p>
                {/* <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p> */}
            </span>
        },
        {
            title: 'Phone',
            colSpan: 0,
            dataIndex: 'address',
        }
    ];

    //   const columnsReview = [
    //     {
    //         title: 'Di input oleh ',
    //         dataIndex: 'pic',
    //         render: (record) => <span>
    //             <h3>{cookie.get("name")}</h3>
    //             <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
    //         </span>
    //     },
    //     {
    //         title: 'Kepala Gudang',
    //         colSpan: 2,
    //         dataIndex: 'Username',
    //         key: 'Username',
    //         render: (value, text, index) => <span>
    //             {/* <Input onChange={(val) => {
    //                 // setItem(val)
    //                 // item[index].quantity = val.target.value;
    //                 // setItem(item);
    //             }} /> */}
    //             <p>{value}</p>
    //             {/* <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p> */}
    //         </span>
    //     },
    //     {
    //         title: 'Phone',
    //         colSpan: 0,
    //         dataIndex: 'phone',
    //         render: () => <span>
    //             <p>Kosong</p>
    //         </span>,
    //     }
    // ];

    // const data = [
    //     {
    //         key: '1',
    //         // name: 'John Brown',
    //         // age: 32,
    //         UserName: 'Test',
    //         // tel: '0571-22098909',
    //         // phone: 18889898989,
    //         // address: 'New York No. 1 Lake Park',
    //     },
    // ];

    const columns = [
        {
            title: 'Kode Barang',
            dataIndex: 'item',
            key: 'item',
            render: (record) => <span>
                {record[0]?.sku}
            </span>
        },
        {
            title: 'Product Name',
            dataIndex: 'item',
            key: 'item',
            render: (record) => <span>
                {record[0]?.productName}
            </span>
        },
        {
            title: 'Quantity',
            dataIndex: 'item',
            key: 'item',
            render: (record) => <span>
                {record[0]?.quantity}
            </span>
        },
        {
            title: 'Keterangan',
            dataIndex: 'item',
            key: 'item',
            render: (record) => <span>
                {record[0]?.description}
            </span>
        },
        {
            title: 'Status',
            dataIndex: 'item',
            key: 'item',
            render: (record) => <span>
                {record[0]?.status}
            </span>
        },
    ];

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
                    <p>No : {selectedDataProduct[0]?.noref}</p>
                </div>
            </div>
            <div style={{ marginLeft: 10 }}>
                <Row type="flex" justify="space-between">
                    <Col style={{ marginLeft: '12px' }}>
                        <Row>
                            <p>Suplier : {selectedDataProduct[0]?.suplierName}</p>
                        </Row>
                        <div style={{ marginTop: 8 }}>
                            <p>Alamat  : {selectedDataProduct[0]?.suplierAddress}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ marginRight: 55, marginTop: 10 }}>
                            <p>Tanggal : {moment().format('MMMM Do YYYY')}</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <Table dataSource={dataReview} columns={columns} style={{ paddingLeft: '12px', marginTop: '10px' }}
                size="small" />
            <Row type="flex" justify="space-between">
                <Col>
                    <div style={{ marginTop: 4, marginLeft: 23 }}>
                        <p>Pengirim  : {selectedDataProduct[0]?.sender}</p>
                    </div>
                    <div style={{ marginTop: 4, marginLeft: 23 }}>
                        <p>No Telepon  : {selectedDataProduct[0]?.senderPhone}</p>
                    </div>
                </Col>
                <Col style={{ marginRight: 45,marginTop: 10,marginBottom: 10}}>
                    <Table columns={columnsReview} dataSource={dataSource} bordered pagination={false} />
                </Col>
            </Row>
        </Card>
    </div>
})