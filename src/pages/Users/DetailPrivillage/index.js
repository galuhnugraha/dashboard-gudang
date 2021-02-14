import React, { useEffect, useState } from "react";
import { Form, Input, Breadcrumb, Switch, Col, Dropdown, Menu, Checkbox, PageHeader, Card, Button, message, Table, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import {
  DownOutlined
} from '@ant-design/icons';
import { observer } from "mobx-react-lite";

function cancel(e) {
  message.error('Click on No');
}

export const DetailPrivillageScreen = observer((initialData) => {
  const { Search } = Input;
  let history = useHistory();
  const [form] = Form.useForm();
  const store = useStore();
  const [filterModal, setFilterModal] = useState(false);
  const [state, setState] = useState({
    success: false,
    userId: ''
  });
  const [filterQuery, setFilterQuery] = useState({});
  const [check , setCheck] = useState({
    insert: false,
    update: false,
    read: false,
    deleted: false
  })
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery]);

  function fetchData() {
    store.user.getUsersPrivillage();
  }

  const toggleSuccess = (() => {
    setState({
      success: !state.success,
    });
  })


  const onChangeInsert = (e) => {
    console.log(e.target.checked = !e.target.checked )
    setCheck({
      insert: e.target.checked 
    })
  }

  const onChangeUpdate = (e) => {
    console.log(e.target.checked = !e.target.checked )
    setCheck({
      update: e.target.checked ,
    })
  }
  const onChangeRead = (e) => {
    console.log(e.target.checked = !e.target.checked )
    setCheck({
      read: e.target.checked ,
    })
  }
  const onChangeDelete = (e) => {
    console.log(e.target.checked = !e.target.checked )
    setCheck({
      deleted: e.target.checked 
    })
  }

  const setEditMode = async (value) => {
    
    store.user.queryDetail.userId = value._id
    const dataOption = await store.user.getPrivillage();
    const objOPtion= dataOption[0]
    setCheck({
      insert: objOPtion.insert,
      deleted: objOPtion.deleted,
      read: objOPtion.read,
      update: objOPtion.update
    })
    setState(prevState => ({
      ...prevState,
      success: true
    }))
    form.setFieldsValue({
      success: true,
      userName: objOPtion.userName,
      insert: objOPtion.insert,
      deleted: objOPtion.deleted,
      read: objOPtion.read,
      update: objOPtion.update
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

  const columnsDetailReview = [
    {
      title: 'Name',
      dataIndex: 'insert',
      key: 'insert',
      render: (text) => <span>
        <p></p>
      </span>
    },
    {
      title: 'Age',
      dataIndex: 'update',
      key: 'update',
    },
    {
      title: 'Address',
      dataIndex: 'deleted',
      key: 'deleted',
    },
    {
      title: 'Read',
      dataIndex: 'read',
      key: 'read',
    },
  ];

  function modalFilter() {
    return <Modal
      maskClosable={false}
      closable={false}
      title={"Update Users"}
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
          <Checkbox 
          checked={check.insert}
          onChange={onChangeInsert}
          >Insert</Checkbox>
        </Form.Item>
        <Form.Item
          label="Update"
          name="update"
        >
          <Checkbox 
          checked={check.update}
          onChange={onChangeUpdate}
          >Update</Checkbox>
        </Form.Item>
        <Form.Item
          label="Read"
          name="read"
        >
          <Checkbox 
          checked={check.read}
          onChange={onChangeRead}
          >Read</Checkbox>
        </Form.Item>
        <Form.Item
          label="Delete"
          name="deleted"
        >
          <Checkbox 
          checked={check.deleted}
          onChange={onChangeDelete}
          >Delete</Checkbox>
        </Form.Item>
      </Form>
      {/* <Table dataSource={store.user.dataQuery.slice()} columns={columnsDetailReview} /> */}
    </Modal>
  }


  const menu = (
    <Menu>
      <Menu.Item>
        <p>Update Privillage</p>
      </Menu.Item>
      <Menu.Item>
        <p onClick={() => {
        }}>
          Update Users
        </p>
      </Menu.Item>
      <Menu.Item>
        <p>
          Delete Users
            </p>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Nama',
      dataIndex: 'UserName',
      key: 'UserName',
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
      render: (record) => <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Menu <DownOutlined />
        </a>
      </Dropdown>
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
      {modalFilter()}
      <Table
        dataSource={store.user.data.slice()}
        columns={columns}
        size="small"
        hasEmpty
        style={{ marginLeft: '12px' }}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              onDetailProduct(record._id)
              setEditMode(record)
            }, // click row
          }
        }}
      // onClick={(record) => {
      //   clickBait(record)
      // }}
      />
    </Card>
  </div>
})