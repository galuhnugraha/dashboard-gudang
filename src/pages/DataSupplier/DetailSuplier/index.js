import React, { useEffect } from "react";
import {
    Table,
    Breadcrumb,
    PageHeader,
    Input,
    Card,
} from 'antd';
import { Link } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import { observer } from "mobx-react-lite";


export const DetailSuplierScreen = observer(() => {
    const store = useStore();
    // const history = useHistory();
    // const [form] = Form.useForm();
    const { Search } = Input;

    useEffect(() => {
        fetchData();
        return () => {
          // store.warehouse.query.pg = 1;
          // store.warehouse.query.lm = 10;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    async function fetchData() {
        await store.supliers.getSupplierProduct();
        // await store.barang.getDropdown();
    }

    const data = store.supliers.data.map((e) => {
        let obj = {
            productName: e.product?.productName,
            pricePerUnit: e.product?.pricePerUnit,
            quantity: e.product?.quantity,
            rack: e.product?.rack,
            sku: e.product?.sku
        }
        return obj;
    })
    console.log(data,'testtttt')


    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Price Per Unit',
            dataIndex: 'pricePerUnit',
            key: 'pricePerUnit',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
    ];

    return <div>
        <Breadcrumb>
            <Breadcrumb.Item>
                {/* Home */}
                <Link to={'/app/dashboard'}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={'/app/data-supplier'}>Data Suplier</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span style={{ color: "#132743" }}>Detail Supplier</span>
            </Breadcrumb.Item>
        </Breadcrumb>
        <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 25, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
            <PageHeader
                className={"card-page-header"}
                subTitle=""
                title={"Detail Suplier"}
                extra={[
                    <Search
                    placeholder="Search...."
                    style={{ width: 200 }}
                    key={row => row._id}
                    onSearch={(value) => {
                      store.supliers.selectedFilterValueDetail = value;
                      store.supliers.setPage(1);
                      // store.member.search(value);
                    }}
                    onChange={event => {
                      store.supliers.selectedFilterValueDetail = event.target.value;
                      store.supliers.setPageDebouncedDetail();
                    }} />
                    // <Button
                    //     key="1"
                    //     onClick={() => {
                    //         // history.push("/app/input-supplier")
                    //     }}
                    // >
                    //     <PlusOutlined /> New
                    // </Button>
                ]}
            />
            <Table
                dataSource={data}
                columns={columns}
                size={"middle"}
                rowKey={record => record.data}
                hasEmpty
                style={{ paddingLeft: '12px' }}
            />
        </Card>
    </div>
})