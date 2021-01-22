import React, { useEffect, useState } from "react";
import { http } from "../../utils/http";
import {
  Table,
  Space,
  Popconfirm, Input,
  message, Breadcrumb,
  PageHeader, Card, Button, Modal, Form
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../utils/useStores";
import { observer } from "mobx-react-lite";

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}

export const WarehouseScreen = observer((initialData) => {
  const store = useStore();
  const history = useHistory();
  const [form] = Form.useForm();
  const [state, setState] = useState({
    success: false,
  });
  const [items, setItems] = useState([])
  useEffect(() => {
    const token = localStorage.getItem("token")
    http.get(`/warehouse`).set({ 'authorization': `Bearer ${token}` }).then((r) => {
      setItems(r.body.data)
    })
    store.warehouse.getWarehouse()
    // eslint - disable - next - line react - hooks / exhaustive - deps
  }, []);
  async function fetchData() {
    await store.warehouse.getWarehouse()
  }

  async function checkWarehouse(id) {
    const datas = await JSON.stringify(id) == "6009bfd3ca1eb1370d332472"
    return datas
  }

  const selectedWarehouse = items.find(checkWarehouse)

  console.log(selectedWarehouse?.items)

  function confirm(_id) {
    store.warehouse.deleteWarehouse(_id).then((res) => {
      message.success('Success delete Warehouse')
      history.push('/app/data-warehouse');
      fetchData();
    }).catch(err => {
      // message.error(err.response.body.message)
    })
  }

  const deleteClick = (_id) => {
    confirm(_id);
  }

  const { Search } = Input;

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

  const toggleSuccess = (() => {
    setState({
      success: !state.success,
    });
  })

  async function editData(e) {
    const data = {
      warehouseName: e.warehouseName,
      warehosueLocation: e.warehosueLocation,
    }

    if (e.isEdit) {
      store.warehouse.updateWarehouse(e.isEdit, data)
        .then(res => {
          message.success('Data Warehouse Di Update!');
          toggleSuccess();
          fetchData();
        })
        .catch(err => {
          message.error(`Error on Updating Warehouse, ${err.message}`);
          message.error(err.message);
        });
    }
  }

  {
    const columns = [
      {
        title: 'Product Name',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: 'Product Type',
        dataIndex: 'productType',
        key: 'productType',
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
                title="Apakah Anda Yakin Untuk Hapus Data ini ....."
                onConfirm={() => {
                  deleteClick(record._id)
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
          className={"card-page-header"}
          subTitle=""
          title={"Warehouse"}
          extra={[
            <Search
              placeholder="Search...."
              style={{ width: 200 }}
              key={row => row._id}
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
          rowKey={record => record._id}
          hasEmpty
          style={{ paddingLeft: '12px' }}
          size={"small"}
          columns={columns}
          dataSource={selectedWarehouse?.items}
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
            // console.log('Validate Failed:', info);
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
})