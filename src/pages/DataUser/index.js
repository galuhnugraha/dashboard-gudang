import React, { useEffect, useState } from "react";
import { Table, Space, Popconfirm, Form, Modal, Input, message, Breadcrumb, PageHeader, Card, Button } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useStore } from "../../utils/useStores";
import { observer } from "mobx-react-lite";
import moment from "moment";

function confirm(e) {
  console.log(e);
  message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}

// const { Search } = Input;

export const DataUserScreen = observer((initialData) => {
  const store = useStore();
  const [form] = Form.useForm();
  useEffect(() => {
    store.user.getAll();
    store.user.setPage(1);
    store.user.setCurrentPage(10);
  }, [])

  const [state, setState] = useState({
    success: false,
  });

  useEffect(() => {
    store.user.getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    await store.user.getAll();
  }

  const toggleSuccess = (() => {
    setState({
      success: !state.success,
    });
  })

  async function editData(e) {
    setState(prevState => ({
      ...prevState,
      success: true
    }))
    const data = {
      email: e.email,
      UserName: e.UserName,
      phone: e.phone,
      birthDate: e.birthDate
    }
    store.user.updateUser(data)
      .then(res => {
        message.success('Data Member Di Update!');
        toggleSuccess();
        fetchData();
      })
      .catch(err => {
        message.error(`Error on Updating Member, ${err.message}`);
        message.error(err.message);
      });
  }

  const setEditMode = (value) => {
    setState(prevState => ({
      ...prevState,
      success: true
    }))
    form.setFieldsValue({
      isEdit: value.id,
      success: true,
      email: value.email,
      UserName: value.UserName,
      phone: value.phone,
      birthDate: value.birthDate
    })
  }

  {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'UserName',
        key: 'UserName',
      },
      {
        title: 'Tanggal Lahir',
        dataIndex: 'birthDate',
        key: 'birthDate',
        render: (text, record) => <span>{moment(text).format('DD-MM-YYYY')}</span>,
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
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <EditOutlined onClick={() => {
                  setEditMode(record);
                }} />
              </div>
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={confirm}
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
          <span style={{ color: "#132743" }}>Data User</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false} className={"shadow"} bodyStyle={{ padding: 0, marginTop: 25, borderRadius: 10, boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.10)' }}>
        <PageHeader
          className={"card-page-header"}
          subTitle=""
          title={"User"}
          extra={[
            <Button
              key="1"
            >
              <PlusOutlined /> New
            </Button>,
          ]}
        />
        {renderModal()}
        <Table
          rowKey={record => record.email}
          hasEmpty
          style={{ paddingLeft: '12px' }}
          size={"small"}
          columns={columns}
          dataSource={store.user.data.slice()}
          pagination={{
            total: store.user.maxLength,
            onShowSizeChange: (current, pageSize) => {
              store.user.setCurrentPage(pageSize);
            }
          }}
          loading={store.user.isLoading}
          onChange={(page) => {
            store.user.setPage(page.current);
          }}
          current={store.user.currentPage}
        />
      </Card>
    </div>
  }
  function renderModal() {
    return <Modal visible={state.success}
      closable={false}
      confirmLoading={false}
      destroyOnClose={true} title="Update Users"
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
      }}>
      <Form layout="vertical" form={form} className={'custom-form'} name="form_in_modal" initialValues={initialData}>
        <Form.Item
          label="Email"
          name="email"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="UserName"
          size={'large'}
          rules={[{ required: true, message: 'Please input your Name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          size={'large'}
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  }
});
