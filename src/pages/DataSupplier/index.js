import React, { useEffect, useState } from "react";
import { Table, Breadcrumb, PageHeader, Select, Input, Form, Modal, Card, Button, Space, message, Popconfirm } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../utils/useStores";
import { observer } from "mobx-react-lite";

function confirm(e) {
  console.log(e);
  message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}

export const DataSupplierScreen = observer((initialData) => {
  const store = useStore();
  const history = useHistory();
  const [form] = Form.useForm();
  const { Search } = Input;
  const [state, setState] = useState({
    success: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await store.supliers.getSupplier();
  }

  function confirm(_id) {
    store.supliers.deleteSupplier(_id).then((res) => {
      message.success('Success delete Suplier')
      history.push('/app/data-supplier');
      fetchData();
    }).catch(err => {
      message.error(err.response.body.message)
    })
  }

  const deleteClick = (_id) => {
    confirm(_id);
  }

  const setEditMode = (value) => {
    setState(prevState => ({
      ...prevState,
      success: true
    }))
    const halo = value.suplierProduct.map(result => {
      const product = [
        {
          productName: result.productName,
          price: result.price
        }
      ]
      console.log(product)
      return result.productName
    })
    form.setFieldsValue(
      {
        isEdit: value._id,
        success: true,
        suplierName: value.suplierName,
        companyName: value.companyName,
        suplierAddress: value.suplierAddress.address,
        suplierPhone: value.suplierPhone,
        suplierProduct: halo
      })
    console.log(typeof value.suplierName)
  }

  const toggleSuccess = (() => {
    setState({
      success: !state.success,
    });
  })

  async function editData(e) {
    const suplierProduct2 = [{
      productName: e.suplierProduct,
    }]
    const suplierAddress2 = {
      address: e.suplierAddress,
    }
    const data = {
      suplierName: e.suplierName,
      companyName: e.companyName,
      suplierAddress: suplierAddress2,
      suplierPhone: e.suplierPhone,
      suplierProduct: suplierProduct2
    }

    if (e.isEdit) {
      store.supliers.updateSupplier(e.isEdit, data)
        .then(res => {
          message.success('Data Supplier Di Update!');
          toggleSuccess();
          fetchData();
        })
        .catch(err => {
          message.error(`Error on Updating Supplier, ${err.message}`);
          message.error(err.message);
        });
    }
  }

  {
    const columns = [
      {
        title: 'Suplier Name',
        dataIndex: 'suplierName',
        key: 'suplierName',
        fixed: 'left',
        width: 120
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
      },
      {
        title: 'Supplier Address',
        dataIndex: 'suplierAddress',
        key: 'suplierAddress',
        render: (text, record) => <span>{record.suplierAddress.address}</span>,
      },
      {
        title: 'Supplier Phone',
        dataIndex: 'suplierPhone',
        key: 'suplierPhone',
      },
      {
        title: 'Suplier Product',
        width: 150,
        dataIndex: 'suplierProduct',
        key: 'suplierProduct',
        render: (text, record) => <span >{record.suplierProduct.map((e) => {
          return <p style={{ width: 250 }}>{e.productName}</p>
        })}</span>
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
                title="Are you sure to delete this task?"
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
          <span style={{ color: "#132743" }}>Data Supplier</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 25, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
        <PageHeader
          className={"card-page-header"}
          subTitle=""
          title={"Supplier"}
          extra={[
            <Search
              placeholder="Search...."
              style={{ width: 200 }}
              key={row => row._id}
              onSearch={(value) => {
                store.supliers.selectedFilterValue = value;
                store.supliers.setPage(1);
                // store.member.search(value);
              }}
              onChange={event => {
                store.supliers.selectedFilterValue = event.target.value;
                store.supliers.setPageDebounced();
              }}
            />,
            <Button
              key="1"
              onClick={() => {
                history.push("/app/input-supplier")
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
          size={"middle"}
          columns={columns}
          scroll={{ x: 1200 }}
          dataSource={store.supliers.data.slice()}
          pagination={{
            total: store.supliers.maxLength,
            onShowSizeChange: (current, pageSize) => {
              store.supliers.setCurrentPage(pageSize);
            }
          }}
          loading={store.supliers.isLoading}
          onChange={(page) => {
            store.supliers.setPage(page.current);
          }}
          current={store.supliers.currentPage}
        />
      </Card>
    </div>
  }
  function renderModal() {
    return <Modal visible={state.success}
      closable={false}
      confirmLoading={false}
      destroyOnClose={true} title="Update Supplier"
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
          label="Supplier Name"
          name="suplierName"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Name!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
        <Form.Item
          label="Company Name"
          name="companyName"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Type!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
        <Form.Item
          label="Supplier Address"
          name="suplierAddress"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Type!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
        <Form.Item
          label="Supplier Phone"
          name="suplierPhone"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Type!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
        <Form.Item
          label="Supplier Product"
          name="suplierProduct"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Type!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
      </Form>
    </Modal>
  }
});
