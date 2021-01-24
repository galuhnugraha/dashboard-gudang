import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Popconfirm, Input,
  Form, Modal,
  Row, Col,
  message, Breadcrumb,
  PageHeader, Card, Button, Select
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../utils/useStores";
import { observer } from "mobx-react-lite";
import { appConfig } from "../config/app";


function cancel(e) {
  console.log(e);
  message.error('Click on No');
}

// const { Search } = Input;

export const DataProdukScreen = observer((initialData) => {
  const store = useStore();
  const [form] = Form.useForm();
  const history = useHistory();
  const [imgData, setImgData] = useState(null);
  const [xImg, setXImg] = useState('')
  const [filterModal, setFilterModal] = useState(false);
  const [filterQuery, setFilterQuery] = useState({});

  const [state, setState] = useState({
    success: false,
    warehouseName: '',
    products: ''
  });

  async function fetchData() {
    store.products.getAll();
    store.warehouse.getWarehouse()
  }

  useEffect(() => {
    fetchData();
    return() =>{
      store.products.query.products = ''
      store.products.query.page = 1;
      store.products.query.pageSize = 10;
    }
  }, [filterQuery]);

  const { Search } = Input;

  function confirm(_id) {
    store.products.deleteProduct(_id).then((res) => {
      message.success('Success delete Product')
      history.push('/app/data-produk');
      fetchData();
    }).catch(err => {
      message.error(err.response.body.message)
    })
  }

  const deleteClick = (_id) => {
    confirm(_id);
  }

  const changeImage = (info) => new Promise((result, reject) => {
    const data = info.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => result(setImgData(reader.result), reader.result);
    reader.onerror = error => reject(error);
  })

  async function editData(e) {
    const data = {
      productType: e.productType,
      quantity: e.quantity,
      sku: e.sku,
      pricePerUnit: e.pricePerUnit,
      grosirPrice: e.grosirPrice,
      productName: e.productName,
      selfing: e.selfing,
      rack: e.rack,
      location: e.location,
      productImage: imgData
    }

    if (e.isEdit) {
      store.products.updateProduct(e.isEdit, data)
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

  const setEditMode = (value) => {
    setXImg(value.productImage)
    setState(prevState => ({
      ...prevState,
      success: true
    }))
    form.setFieldsValue({
      isEdit: value._id,
      success: true,
      productType: value.productType,
      quantity: value.quantity,
      sku: value.sku,
      pricePerUnit: value.pricePerUnit,
      grosirPrice: value.grosirPrice,
      productName: value.productName,
      productImage: value.productImage,
      selfing: value.selfing,
      rack: value.rack,
      location: value.location,
    })
  }

  const toggleSuccess = (() => {
    setState({
      success: !state.success,
    });
  })

  function onOkFilter() {
    if(state.products){
      store.products.query.products = state.products
      fetchData()
    }

    if(state.warehouseId !== ''){
      setFilterQuery({
        ...filterQuery,
        warehouseName : state.warehouseName
      })
    }
    setFilterModal(false);
  }

  function resetFilter(){
    form.validateFields().then((values) => {
      form.resetFields();
    });
    setState({ 
      warehouseId: '',
    });
    store.products.query.warehouseId = ''
    delete filterQuery['warehouse']
    setFilterQuery({
      ...filterQuery,
    })
    setFilterModal(false);
  }


  function modalFilter() {
    return <Modal
      maskClosable={false}
      closable={false}
      afterClose={() => {
        setFilterModal(false)
      }
      }
      title={"Filter"}
      visible={filterModal}
      footer={[
        <Button onClick={() => {
          resetFilter()
        }}>Reset Filter</Button>,
        <Button key="back" onClick={() => setFilterModal(false)}>
          Cancel
      </Button>,
        <Button key="submit" type="primary" onClick={onOkFilter}>
          Filter
      </Button>,
      ]}
    >
      <Form initialValues={initialData} form={form} layout="vertical">
        <Form.Item label="Warehouse" name="warehouseName" >
          <Select placeholder="Select Warehouse" style={{ width: '97%' }} onChange={(value) =>  setState({...state, warehouseName: value })}>
            {store.warehouse.data.map(d => <Select.Option value={d._id}>{d.warehouseName}</Select.Option>)}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  }


  {
    const columns = [
      {
        title: 'Product Name',
        dataIndex: 'productName',
        width: 150,
        fixed: 'left',
        key: 'productName',
      },
      {
        title: 'Product Type',
        dataIndex: 'productType',
        fixed: 'left',
        width: 150,
        key: 'productType',
      },
      {
        title: 'Product Image',
        dataIndex: 'productImage',
        width: 150,
        key: 'productImage',
        render: (photo) => {
          return <img src={`${appConfig.apiImage}/` + photo} style={{ width: 60, height: 60 }} />
        }
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
      },
      {
        title: 'Price Per Unit',
        width: 120,
        dataIndex: 'pricePerUnit',
        key: 'pricePerUnit',
      },
      {
        title: 'Grosir Price',
        width: 100,
        dataIndex: 'grosirPrice',
        key: 'grosirPrice',
      },
      {
        title: 'Product Location',
        dataIndex: 'location',
        width: 150,
        key: 'location',
      },
      {
        title: 'Rak',
        dataIndex: 'rack',
        key: 'rack',
      },
      {
        title: 'Selfing',
        dataIndex: 'selfing',
        key: 'selfing',
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
          <span style={{ color: "#132743" }}>Data Produk</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 25, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
        <PageHeader
          className={"card-page-header"}
          subTitle=""
          title={"Produk"}
          extra={[
            <Search
              placeholder="Search...."
              style={{ width: 200 }}
              key={row => row._id}
              onSearch={(value) => {
                store.products.selectedFilterValue = value;
                store.products.setPage(1);
                // store.member.search(value);
              }}
              onChange={event => {
                store.products.selectedFilterValue = event.target.value;
                store.products.setPageDebounced();
              }}
            />,
            <Button
              key="1"
              onClick={() => {
                history.push("/app/input-product")
              }}
            >
              <PlusOutlined /> New
          </Button>,
            // <Select placeholder="Select Warehouse" style={{ width: 100 }}>
            //   {store.warehouse.data.map(d => <Select.Option value={d._id}>{d.warehouseName}</Select.Option>)}
            // </Select>
            <Button
              key="1"
              onClick={() => setFilterModal(true)}
            >
              <FilterOutlined /> Filter
        </Button>
          ]}
        />
         {modalFilter()}
        {renderModal()}
        <Table
          rowKey={record => record._id}
          hasEmpty
          style={{ paddingLeft: '12px' }}
          size={"middle"}
          columns={columns}
          scroll={{ x: 1200 }}
          dataSource={store.products.data.slice()}
          pagination={{
            total: store.products.maxLength,
            onShowSizeChange: (current, pageSize) => {
              store.products.setCurrentPage(pageSize);
            }
          }}
          loading={store.products.isLoading}
          onChange={(page) => {
            store.products.setPage(page.current);
          }}
          current={store.products.currentPage}
        />
      </Card>
    </div>
  }
  function renderModal() {
    return <Modal visible={state.success}
      closable={false}
      confirmLoading={false}
      destroyOnClose={true} title="Update Produk"
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
        <Row>
          <Col lg={11}>
            <Form.Item name="isEdit" hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Product Name"
              name="productName"
              size={'large'}
              rules={[{ required: true, message: 'Please input your Product Type!' }]}
            >
              <Input style={{ width: '98%' }} />
            </Form.Item>
          </Col>
          <Col lg={2} />
          <Col lg={11}>
            <Form.Item
              label="Product Type"
              name="productType"
              size={'large'}
              rules={[{ required: true, message: 'Please input your Product Location!' }]}
            >
              <Input style={{ width: '95%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col lg={11}>
            <Form.Item
              label="Product Location"
              name="location"
              size={'large'}
              rules={[{ required: true, message: 'Please input your Product Type!' }]}
            >
              <Input style={{ width: '98%' }} />
            </Form.Item>
          </Col>
          <Col lg={2} />
          <Col lg={11}>
            <Form.Item
              label="Rack"
              name="rack"
              size={'large'}
              rules={[{ required: true, message: 'Please input your Product Location!' }]}
            >
              <Input style={{ width: '95%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col lg={11}>
            <Form.Item
              label="Price Per Unit"
              name="pricePerUnit"
              size={'large'}
              rules={[{ required: true, message: 'Please input your Product Type!' }]}
            >
              <Input style={{ width: '98%' }} />
            </Form.Item>
          </Col>
          <Col lg={2} />
          <Col lg={11}>
            <Form.Item
              label="Grosir Price"
              name="grosirPrice"
              size={'large'}
              rules={[{ required: true, message: 'Please input your Product Location!' }]}
            >
              <Input style={{ width: '95%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col lg={11}>
            <Form.Item
              label="Quantity"
              name="quantity"
              size={'large'}
              rules={[{ required: true, message: 'Please input your Product Type!' }]}
            >
              <Input style={{ width: '98%' }} />
            </Form.Item>
          </Col>
          <Col lg={2} />
          <Col lg={11}>
            <Form.Item
              name="sku"
              label="SKU"
              size={'large'}
              rules={[{ required: true, message: 'Please input your Product Location!' }]}
            >
              <Input style={{ width: '95%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Selfing"
          name="selfing"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Name!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
        <Form.Item
          label="Product Image"
          name="productImage"
        >
          {imgData ? <img src={imgData} alt="avatar" style={{ width: 180, height: 140, objectFit: 'contain', marginBottom: 15, borderRadius: 6 }} /> :
            <img src={`${appConfig.apiImage}/${xImg}`} alt="avatar" style={{ width: 110, height: 110, marginBottom: 10, borderRadius: 4 }} />}
          <input type="file" id="files" onChange={changeImage} />
        </Form.Item>
      </Form>
    </Modal>
  }
});