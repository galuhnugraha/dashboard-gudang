import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Popconfirm, Input,
  message, Breadcrumb,
  PageHeader, Card, Button, Modal, Form,
  Select
} from 'antd';
import {
  DeleteOutlined,
  FilterOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../utils/useStores";
import { observer } from "mobx-react-lite";
import moment from "moment";


function cancel(e) {
  message.error('Anda Tidak Jadi Hapus Data Ini!');
}

export const WarehouseScreen = observer((initialData) => {
  const store = useStore();
  const history = useHistory();
  const [form] = Form.useForm();
  const [state, setState] = useState({
    success: false,
    warehouseId: '',
  });
  const [filterModal, setFilterModal] = useState(false);
  const [filterQuery, setFilterQuery] = useState({});

  useEffect(() => {
    fetchData();
    return () => {
      // store.warehouse.query.pg = 1;
      // store.warehouse.query.lm = 10;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery]);

  async function fetchData() {
    await store.warehouse.getWarehouse();
    await store.barang.getDropdown();
  }

  const data = store.warehouse.data.map((e) => {
    return {
      productName: e.product?.productName,
      status: e.status,
      quantity: e.product?.quantity,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt
    }
  })

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

  // const setEditMode = (value) => {
  //   setState(prevState => ({
  //     ...prevState,
  //     success: true
  //   }))
  //   form.setFieldsValue({
  //     isEdit: value._id,
  //     success: true,
  //     quantity: value.quantity,
  //   })
  // }

  const toggleSuccess = (() => {
    setState({
      success: !state.success,
    });
  })

  function onOkFilter() {
    store.warehouse.query.warehouseId = state.warehouseId;
    setFilterQuery({
      ...filterQuery,
      warehouseId: state.warehouseId,
    })
    setFilterModal(false);
  }

  function resetFilter() {
    setState({
      warehouseId: '',
    });
    store.warehouse.query.warehouseId = ''
    delete filterQuery['warehouseId']
    setFilterQuery({
      ...filterQuery,
    })
    setFilterModal(false);
  }

  function modalFilter() {
    return <Modal
      maskClosable={false}
      closable={false}
      title={"Filter"}
      visible={filterModal}
      footer={[
        <Button key="reset" onClick={() => {
          resetFilter()
        }}>Reset Filter</Button>,
        <Button key="back" onClick={() => setFilterModal(false)}>
          Cancel
      </Button>,
        <Button key="button" style={{backgroundColor: '#132743',color: 'white'}} onClick={onOkFilter}>
          Filter
      </Button>,
      ]}
    >
      <Form initialValues={initialData} form={form} layout="vertical">
        <Form.Item label="Warehouse" name="_id" >
          <Select placeholder="Select Warehouse" style={{ width: '97%' }} onChange={(value) => {
            setState({ warehouseId: value });
          }}>
            {store.barang.data.map(d => <Select.Option value={d._id} key={d._id}>{d.warehouseName}</Select.Option>)}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  }

  async function editData(e) {
    const data = {
      quantity: e.quantity
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
        title: 'Nama Barang',
        dataIndex: 'productName',
        key: 'productName',
        render: (record) => <span>{record}</span>
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (record) => <span>{record}</span>
      },
      {
        title: 'Created at',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (record) => moment(record).format("DD/MM/YY, H:mm:ss")
      },
      {
        title: 'Updated at',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (record) => moment(record).format("DD/MM/YY, H:mm:ss")
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Popconfirm
                title="Apakah Anda Yakin Ingin Hapus Data Ini?"
                onConfirm={() => {
                  deleteClick(record._id)
                }}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined style={{ marginLeft: 6 }} />
              </Popconfirm>,
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
      <Card key="snoopDog" bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 25, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
        <PageHeader
          className={"card-page-header"}
          subTitle=""
          title={"Warehouse"}
          extra={[
            <Search
              placeholder="Search...."
              style={{ width: 200 }}
              key={row => row._id}
              onSearch={(value) => {
                store.warehouse.selectedFilterValue = value;
                store.warehouse.setPage(1);
                // store.member.search(value);
              }}
              onChange={event => {
                store.warehouse.selectedFilterValue = event.target.value;
                store.warehouse.setPageDebounced();
              }}
            />,
            <Button
              key="butonPushHistory"
              onClick={() => {
                history.push("/app/input-warehouse")
              }}
            >
              <PlusOutlined /> New
              </Button>,
            <Button
            key="buttonFilter"
            htmlType={"button"}
              onClick={() => setFilterModal(true)}
            >
              <FilterOutlined /> Filter
            </Button>
          ]}
        />
        {modalFilter()}
        {renderModal()}
        <Table
          key="AldinMotherFucker"
          hasEmpty
          style={{ paddingLeft: '12px' }}
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
            editData(values)
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
          label="Quantity"
          name="quantity"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Name!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
      </Form>
    </Modal>
  }
})