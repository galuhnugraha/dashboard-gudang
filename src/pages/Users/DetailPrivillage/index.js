import React, { useEffect, useState } from "react";
import { Form, Input, Breadcrumb, Popconfirm, Switch, Checkbox, PageHeader, Card, Button, message, Table, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import {
  DeleteOutlined,
  EditOutlined,
  FormOutlined
} from '@ant-design/icons';
import { observer } from "mobx-react-lite";

function cancel(e) {
  message.error('Click on No');
}

export const DetailPrivillageScreen = observer((initialData, initialValue) => {
  const { Search } = Input;
  let history = useHistory();
  const [form] = Form.useForm();
  const store = useStore();
  const [state, setState] = useState({
    success: false,
    privillage: false,
    users: false,
    userId: ''
  });
  const [filterQuery, setFilterQuery] = useState({});
  const [check, setCheck] = useState({
    insert: false,
    update: false,
    read: false,
    deleted: false
  })
  const [insert, setInsert] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [read, setRead] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery]);

  function fetchData() {
    store.user.getUsersPrivillage();
    store.user.getPrivillage();
  }

  const toggleSuccess = (() => {
    setState({
      success: !state.success,
    });
  })

  const toggleSuccessPrivillage = (() => {
    setState({
      privillage: !state.privillage,
    });
  })

  const toggleSuccessUsers = (() => {
    setState({
      users: !state.users,
    });
  })

  const insertCheck = (checked) => {
    setInsert(checked)
  }

  const updateCheck = (values) => {
    setUpdated(values)
  }

  const deletedCheck = (yes) => {
    setDeleted(yes)
  }

  const readCheck = (no) => {
    setRead(no)
  }

  const setEditMode = async (value) => {
    store.user.queryDetail.userId = value._id
    const dataOption = await store.user.getPrivillage();
    setInsert(dataOption[0].insert);
    setUpdated(dataOption[0].update);
    setRead(dataOption[0].read);
    setDeleted(dataOption[0].deleted);
    setState(prevState => ({
      ...prevState,
      success: true
    }))
    form.setFieldsValue({
      success: true,
      insert: dataOption[0].insert,
      deleted: dataOption[0].deleted,
      read: dataOption[0].read,
      update: dataOption[0].update
    })
  }

  function onDetailProduct(value) {
    store.user.queryDetail.userId = value
    setFilterQuery({
      ...filterQuery,
      userId: value,
    })
    console.log(value)
  }

  async function editData(e) {
    const data = {
      name: e.name,
      email: e.email,
      phone: e.phone,
    }

    if (e.isEdit) {
      store.user.updatedPrivillage(e.isEdit, data)
        .then(res => {
          message.success('Data Users Privillage Diubah!');
          toggleSuccessUsers();
          fetchData();
        })
        .catch(err => {
          message.error(`Error on Updating Member, ${err.message}`);
          message.error(err.message);
        });
    }
  }

  async function editDataDetail(value) {
    // store.user.queryDetail.userId = value._id
    // const dataOption = await store.user.getPrivillage();
    // setInsert(insert);
    // setUpdated(updated);
    // setRead(read);
    // setDeleted(deleted);
    const data = {
      insert: insert,
      deleted: deleted,
      read: read,
      update: updated
    }
    console.log(data, 'oke')
    if (value.isEdit) {
      store.user.updatedPrivillageDetail(value.isEdit, data)
        .then(res => {
          message.success('Data Users Privillage Diubah!');
          toggleSuccessPrivillage();
          fetchData();
        })
        .catch(err => {
          message.error(`Error on Updating Privillage, ${err.message}`);
          message.error(err.message);
        });
    }
  }

  const userMapping = store.user.data.map((e) => {
    return {
      _id: e._id,
      UserName: e.UserName,
      email: e.email,
      phone: e.phone,
      position: e.position
    }
  })

  const deleteClick = (id) => {
    confirm(id);
  }

  function confirm(id) {
    store.user.deletedPrivillage(id).then((res) => {
      message.success('Success delete Users Departemen')
      history.push('/app/privillage-detail');
      fetchData();
    }).catch(err => {
      message.error(err.response.body.message)
    })
  }


  const setEditModePrivillage = async (value) => {
    store.user.queryDetail.userId = value._id
    const dataOption = await store.user.getPrivillage();
    setInsert(dataOption[0].insert);
    setUpdated(dataOption[0].update);
    setRead(dataOption[0].read);
    setDeleted(dataOption[0].deleted);
    setState(prevState => ({
      ...prevState,
      privillage: true
    }))
    form.setFieldsValue({
      privillage: true,
      isEdit: value._id,
      insert: insert,
      deleted: deleted,
      read: read,
      update: updated
    })
  }

  function modalFilterNew() {
    return <Modal
      maskClosable={false}
      closable={false}
      title={"Detail Privillage"}
      visible={state.success}
      destroyOnClose={true}
      // footer={null}
      onCancel={() => {
        form.validateFields().then(values => {
          form.resetFields();
        });
        toggleSuccess();
      }}
    >
      <Form layout="vertical" form={form} className={'custom-form'} name="form_in_modal" initialValues={initialData}>
        {/* <Form.Item name="isEdit" hidden={true}>
          <Input />
        </Form.Item> */}
        <Form.Item
          label="Insert"
          name="insert"
        >
          {/* <Checkbox
            checked={check.insert}
          >Insert</Checkbox> */}
          <Switch checked={insert} />
        </Form.Item>
        <Form.Item
          label="Update"
          name="update"
        >
          <Switch checked={updated} />
        </Form.Item>
        <Form.Item
          label="Read"
          name="read"
        >
          <Switch checked={read} />
        </Form.Item>
        <Form.Item
          label="Delete"
          name="deleted"
        >
          <Switch checked={deleted} />
        </Form.Item>
      </Form>
      {/* <Table dataSource={store.user.dataQuery.slice()} columns={columnsDetailReview} /> */}
    </Modal>
  }

  function modalFilterDetail() {
    return <Modal
      maskClosable={false}
      closable={false}
      title={"Update Privillage"}
      visible={state.privillage}
      destroyOnClose={true}
      // footer={null}
      onCancel={() => {
        form.validateFields().then(values => {
          form.resetFields();
        });
        toggleSuccessPrivillage();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            editDataDetail(values);
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
          label="Insert"
          name="insert"
        >
          {/* <Checkbox checked={insert} onChange={insertCheck}>Insert</Checkbox> */}
          <Switch checked={insert} onChange={insertCheck} />
        </Form.Item>
        <Form.Item
          label="Update"
          name="update"
        >
          {/* <Checkbox checked={updated} onChange={updateCheck}>Update</Checkbox> */}
          <Switch checked={updated} onChange={updateCheck} />
        </Form.Item>
        <Form.Item
          label="Read"
          name="read"
        >
          {/* <Checkbox checked={read} onChange={readCheck}
          >Read</Checkbox> */}
          <Switch checked={read} onChange={readCheck} />
        </Form.Item>
        <Form.Item
          label="Delete"
          name="deleted"
        >
          {/* <Checkbox checked={deleted} onChange={deletedCheck}
          >Delete</Checkbox> */}
          <Switch checked={deleted} onChange={deletedCheck} />
        </Form.Item>
      </Form>
      {/* <Table dataSource={store.user.dataQuery.slice()} columns={columnsDetailReview} /> */}
    </Modal>
  }

  function modalUpdateUsers() {
    return <Modal
      title={"Update Users"}
      visible={state.users}
      // footer={null}
      onCancel={() => {
        form.validateFields().then(values => {
          form.resetFields();
        });
        toggleSuccessUsers();
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
      <Form layout="vertical" form={form} className={'custom-form'} name="form_in_out" initialValues={initialData}>
        <Form.Item name="isEdit" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Nama"
          name="name"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Name!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Type!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Product Type!' }]}
        >
          <Input style={{ width: '98%' }} />
        </Form.Item>
      </Form>
      {/* <Table dataSource={store.user.dataQuery.slice()} columns={columnsDetailReview} /> */}
    </Modal>
  }

  const setEditModeUsers = (value) => {
    setState(prevState => ({
      ...prevState,
      users: true
    }))
    form.setFieldsValue(
      {
        isEdit: value._id,
        users: true,
        name: value.UserName,
        email: value.email,
        phone: value.phone,
        position: value.position
      })
  }

  const columns = [
    {
      title: 'Nama',
      dataIndex: 'UserName',
      key: 'UserName',
      onCell: (record, rowIndex) => ({
        onClick: () => {
          onDetailProduct(record._id)
          setEditMode(record)
        }
      })
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Action',
      render: (record, index) => <span>
        <div>
          <EditOutlined onClick={() => {
            setEditModePrivillage(record)
          }} />
          <FormOutlined style={{ marginLeft: 8 }} onClick={() => {
            // console.log(record)
            setEditModeUsers(record)
          }} />
          {/* <a>Delete Users</a> */}
          <Popconfirm
            title="Apakah Anda Ingin Menghapus Data Ini?"
            onConfirm={() => {
              deleteClick(record._id)
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ marginLeft: 8 }} />
          </Popconfirm>
        </div>
      </span>
    },
  ];

  return <div>
    <Breadcrumb>
      <Breadcrumb.Item>
        {/* Home */}
        <Link to={'/app/dashboard'}>Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span style={{ color: "#132743" }}>User Privillage</span>
      </Breadcrumb.Item>
    </Breadcrumb>
    <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 10, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
      <PageHeader
        className="card-page-header"
        subTitle=""
        title={"Users Departemen"}
        extra={[
          <Search
            placeholder="Search...."
            style={{ width: 200 }}
          // key={row => row._id}
          />,
          <Button
            key={"1"}
            onClick={() => {
              history.push("/app/input-detail-add")
            }}
          >
            Tambah
          </Button>,
        ]}
      />
      {modalFilterDetail()}
      {modalUpdateUsers()}
      {modalFilterNew()}
      <Table
        dataSource={userMapping}
        columns={columns}
        size="small"
        hasEmpty
        style={{ marginLeft: '12px' }}
      // onClick={(record) => {
      //   clickBait(record)
      // }}
      />
    </Card>
  </div>
})