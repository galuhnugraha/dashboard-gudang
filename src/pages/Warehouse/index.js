import React, { useEffect, useState } from "react";
import { Table, Card, Popconfirm, Modal, Form, message, Space, PageHeader, Input, Breadcrumb, Button } from 'antd';
import { observer } from "mobx-react-lite";
import { useStore } from "../../utils/useStores";
import { Link, useHistory } from 'react-router-dom';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import "antd/dist/antd.css";
import "./index.css";


function cancel(e) {
  message.error('Click on No');
}

export const WarehouseScreen = observer((initialData) => {
  const store = useStore();
  const history = useHistory();
  const { Search } = Input;
  const [state, setState] = useState({
    success: false,
    warehouseId: '',
    warehouseName: ''
  });
  const [form] = Form.useForm();
  const [filterQuery, setFilterQuery] = useState({});
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery]);


  async function fetchData() {
    await store.warehouse.getDataWarehouse();
    await store.warehouseData.getWarehouseData();
  }

  const toggleSuccess = (() => {
    setState({
      success: !state.success,
    });
  })

  const data = store.warehouse.data.map((e) => {
    return {
      _id: e._id,
      warehouseName: e.warehouseName,
      warehosueLocation: e.warehosueLocation
    }
  })

  function confirm(_id) {
    store.warehouseData.deleteWarehouseData(_id).then((res) => {
      message.success('Success delete Warehouse')
      history.push('/app/data-warehouse');
      fetchData();
    }).catch(err => {
      message.error(err.response.body.message)
    })
  }

  const setEditMode = (value) => {
    setState(prevState => ({
      ...prevState,
      success: true
    }))
    form.setFieldsValue({
      isEdit: value._id,
      success: true,
      warehouseName: value.warehouseName,
      warehosueLocation: value.warehosueLocation,
    })
  }

  async function editData(e) {
    const data = {
      warehouseName: e.warehouseName,
      warehosueLocation: e.warehosueLocation,
    }

    if (e.isEdit) {
      store.warehouseData.updateWarehouseData(e.isEdit, data)
        .then(res => {
          message.success('Data Produk Di Update!');
          toggleSuccess();
          fetchData();
        })
        .catch(err => {
          message.error(`Error on Updating Member, ${err.message}`);
          message.error(err.message);
        });
    }
  }

  function onDetailProduct(value) {
    // setState({warehouseId: value})
    store.warehouse.detailWarehouseQuery.warehouseId = value
    setFilterQuery({
      ...filterQuery,
      warehouseId: state.warehouseId,
    })
    history.push("/app/detail-warehouse/" + value)
  }

  {
    const columns = [
      {
        title: 'Warehouse Name',
        dataIndex: 'warehouseName',
        key: 'warehouseName',
        render: (value, record) => <span style={{ color: '#132743' }} onChange={(value) => {
          setState({
            warehouseId: value
          })
        }} onClick={() => {
          onDetailProduct(record._id)
        }}>
          {value}
        </span>
      },
      {
        title: 'Warehouse Location',
        dataIndex: 'warehosueLocation',
        key: 'warehosueLocation',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <EditOutlined onClick={() => {
                  setEditMode(record)
                }} />
              </div>
              <Popconfirm
                title="Apakah Kamu Yakin Hapus Data Warehouse Ini?"
                onConfirm={() => {
                  confirm(record._id)
                }}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <div style={{ marginLeft: 8 }}>
                  <DeleteOutlined />
                </div>
              </Popconfirm>
            </div>
          </Space>
        ),
      },
    ];

    return <div style={{ paddingLeft: 10, paddingRight: 10 }}>
      <Breadcrumb>
        <Breadcrumb.Item>
          {/* Home */}
          <Link to={'/app/dashboard'}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={{ color: "#132743" }}>Data Warehouse</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 25, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
        <PageHeader
          className="card-page-header"
          subTitle=""
          title={"List Gudang"}
          extra={[
            <Search
              placeholder="Search...."
              style={{ width: 200 }}
              key={row => row._id}
              onSearch={(value) => {
                console.log(value)
                store.warehouseData.selectedFilterValue = value;
                store.warehouseData.setPage(1);
                // store.member.search(value);
              }}
              onChange={event => {
                store.warehouseData.selectedFilterValue = event.target.value;
                store.warehouseData.setPageDebounced();
              }}
            />,
            <Button
              key="1"
              onClick={() => {
                history.push("/app/input-warehouse")
              }}
            >
              <PlusOutlined /> New
          </Button>
          ]}
        />
        {renderModal()}
        <Table
          dataSource={data}
          rowKey={record => record._id}
          loading={store.warehouse.isLoading}
          columns={columns}
          size="small"
          className="card-page-header"
          style={{ paddingLeft: '12px' }}
        />
      </Card>
    </div>
  }

  function renderModal() {
    return <Modal visible={state.success}
      closable={false}
      confirmLoading={false}
      destroyOnClose={true} title="Update Warehouse"
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
            editData(values);
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
          label="Warehouse Name"
          name="warehouseName"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Name!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
        <Form.Item
          label="Warehouse Location"
          name="warehosueLocation"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Type!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
      </Form>
    </Modal>
  }
});