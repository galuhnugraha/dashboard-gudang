import React, { useEffect, useState } from "react";
import { Form, Input, Breadcrumb, Switch, Space, Popconfirm, PageHeader, Card, Button, message, Table, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../utils/useStores";
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { observer } from "mobx-react-lite";

function cancel(e) {
  message.error('Click on No');
}

export const DataUserScreen = observer((initialData) => {
  const { Search } = Input;
  let history = useHistory();
  const [form] = Form.useForm();
  const store = useStore();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    success: false,
    dapartment: '',
    position: ''
  });
  const [filterQuery, setFilterQuery] = useState({});
  const [check, setCheck] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery]);

  function fetchData() {
    store.user.getAll();
    store.user.getUsersPrivillage();
  }

  function onDetailProduct(value) {
    store.user.query.dapartment = value
    setFilterQuery({
      ...filterQuery,
      dapartment: value,
    })
    history.push("/app/privillage-detail")
  }

  function onDetailProductReview(value) {
    store.user.query.position = value
    setFilterQuery({
      ...filterQuery,
      position: value,
    })
    // history.push("/app/privillage-detail")
  }

  const toggleSuccess = (() => {
    setState({
      success: !state.success,
    });
  })

  const setEditMode = (value) => {
    setState(prevState => ({
      ...prevState,
      success: true
    }))
    setCheck(value.isActive)
    form.setFieldsValue({
      isEdit: value._id,
      isActive: value.isActive,
      success: true,
      option: value.option,
      subOption: value.subOption,
      url: value.url
    })
  }

  const unchecked = (checked) => {
    setCheck(checked)
  }

  const mapping = store.user.data.map((e) => {
    let dataMapping = {
      _id: e._id,
      option: e.option,
      subOption: e.subOption
    }
    return dataMapping
  })

  async function editData(e) {
    setLoading(true);
    const data = {
      option: e.option,
      isActive: e.isActive,
      subOption: e.subOption,
      url: e.url
    }

    if (e.isEdit) {
      store.user.updateDepartement(e.isEdit, data)
        .then(res => {
          setLoading(false);
          message.success('Data Produk Di Update!');
          toggleSuccess();
          fetchData();
        })
        .catch(err => {
          setLoading(false);
          // message.error(err.message);
        });
    }
  }

  const deleteClick = (_id) => {
    confirm(_id);
  }

  function confirm(_id) {
    setLoading(true);
    store.user.deleteDepartemen(_id).then((res) => {
      setLoading(false);
      message.success('Success delete Suplier')
      history.push('/app/user-privillage');
      fetchData();
    }).catch(err => {
      setLoading(false);
      // message.error(err)
    })
  }

  const columns = [
    {
      title: 'Nama Departemen',
      dataIndex: 'option',
      key: 'option',
      onCell: (record, rowIndex) => ({
        onClick: () => {
          onDetailProduct(record.option)
          onDetailProductReview(record.subOption)
        }
      })
    },
    {
      title: 'Posisi',
      dataIndex: 'subOption',
      key: 'subOption',
    },
    {
      title: 'Action',
      render: (text, record) => (
        <Space size="middle">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <EditOutlined onClick={() => {
                setEditMode(record)
              }} />
            </div>
            <div style={{ marginLeft: 8 }}>
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
          </div>
        </Space>
      ),
    },
  ];

  return <div>
    <Breadcrumb>
      <Breadcrumb.Item>
        {/* Home */}
        <Link to={'/app/dashboard'}>Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span style={{ color: "#132743" }}>Data Departemen</span>
      </Breadcrumb.Item>
    </Breadcrumb>
    <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
      <PageHeader
        className="card-page-header"
        subTitle=""
        title={"Data Departemen"}
        extra={[
          <Search
            placeholder="Search...."
            style={{ width: 200 }}
            key={"2"}
          />,
          <Button
            key={"1"}
            onClick={() => {
              history.push("/app/input-user-privillage")
            }}
          >
            Tambah
          </Button>,
        ]}
      />
      {renderModal()}
      <Table dataSource={mapping}
        columns={columns}
        loading={store.user.isLoading} size="small"
        hasEmpty
        style={{ marginLeft: '12px' }}
        rowKey={(record) => record._id}
      />
    </Card>
  </div>
  function renderModal() {
    return <Modal visible={state.success}
      closable={false}
      confirmLoading={false}
      destroyOnClose={true} title="Update Departemen"
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
            loading(values)
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
          label="Nama Departemen"
          name="option"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Name!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
        <Form.Item
          label="Posisi"
          name="subOption"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Type!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
        <Form.Item
          label="Active"
          name="isActive"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Type!' }]}
        >
          <Switch checked={check} onChange={unchecked} />
        </Form.Item>
        <Form.Item
          label="Url"
          name="url"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Type!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
      </Form>
    </Modal>
  }
})