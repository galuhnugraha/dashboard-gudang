import React,{useState} from "react";
import { observer } from 'mobx-react-lite';
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col, Card, DatePicker,message  } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { useStore } from "../../../utils/useStores";

export const ConfirmationScreen = observer(() => {
    return <div>
        <h1>Email Confirmation Register</h1>
    </div>
})