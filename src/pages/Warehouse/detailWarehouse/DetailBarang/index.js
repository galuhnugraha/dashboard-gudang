import React, { useEffect} from "react";
import {
    Table
} from 'antd';
// import {useHistory } from 'react-router-dom';
import { useStore } from "../../../../utils/useStores";
import { observer } from "mobx-react-lite";
// import moment from "moment";



export const DetailWarehouseBarangScreen = observer(() => {
    const store = useStore();
    // const history = useHistory();
    // const [form] = Form.useForm();
    // const [state, setState] = useState({
    //     success: false,
    //     warehouseId: '',
    // });

    useEffect(() => {
        fetchData();
        return () => {
            // store.warehouse.query.pg = 1;
            // store.warehouse.query.lm = 10;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchData() {
        await store.warehouse.getWarehouse();
        // await store.barang.getDropdown();
    }

    const data = store.warehouse.data.map((e) => {
        return {
            productName: e.product?.productName,
            status: e.status,
            quantity: e.product?.quantity,
            location: e.product?.location,
            pricePerUnit: e.product?.pricePerUnit,
            grosirPrice: e.product?.grosirPrice,
            _id: e._id,
            // warehouseName: e.warehouse?.warehouseName
        }
    })

    const columns = [

        {
            title: 'Nama Barang',
            dataIndex: 'productName',
            key: 'productName',
            render: (record) => <span onClick={() => {
                console.log(record._id)
            }}>{record}</span>
        },
        {
            title: 'Stok',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Price Per Unit',
            dataIndex: 'pricePerUnit',
            key: 'pricePerUnit',
        },
        {
            title: 'Grosir Price',
            dataIndex: 'grosirPrice',
            key: 'grosirPrice',
        },
    ];

    return <Table
        rowKey={record => record._id}
        hasEmpty
        // style={{ paddingLeft: '12px' }}
        size={"small"}
        columns={columns}
        dataSource={data}
        onChange={(page) => {
            store.warehouse.setPage(page.current);
        }}
        current={store.warehouse.currentPage}
        pagination={{
            total: store.warehouse.maxLength,
            onShowSizeChange: (current, pageSize) => {
                store.warehouse.setCurrentPage(pageSize);
            }
        }}
        loading={store.warehouse.isLoading}
    />
})