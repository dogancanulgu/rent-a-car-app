import React from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Link from 'next/link';

const Register = ({ onFinish }) => {
  return (
    <Form name='register' initialValues={{ role: 'user', language: 'tr' }} onFinish={onFinish}>
      <FormItem
        name='name'
        rules={[
          {
            required: true,
            message: 'Please input your Name!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder='Name' />
      </FormItem>
      <FormItem
        name='surname'
        rules={[
          {
            required: true,
            message: 'Please input your Surname!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder='Surname' />
      </FormItem>
      <FormItem
        name='email'
        rules={[
          {
            type: 'email',
          },
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder='Email' />
      </FormItem>
      <FormItem
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} type='password' placeholder='Password' />
      </FormItem>

      <Form.Item name='role' rules={[{ required: true, message: 'Please select your Role!' }]}>
        <Select
          placeholder='Role'
          options={[
            { value: 'user', label: <span>User</span> },
            { value: 'owner', label: <span>Owner</span> },
          ]}
        />
      </Form.Item>

      <Form.Item name='language' rules={[{ required: true, message: 'Please select your Language!' }]}>
        <Select
          placeholder='Language'
          options={[
            { value: 'tr', label: <span>Türkçe</span> },
            { value: 'en', label: <span>English</span> },
          ]}
        />
      </Form.Item>

      <FormItem>
        <Button type='primary' htmlType='submit' className='fullWidth'>
          Register
        </Button>
      </FormItem>
      <Link href='/login' className='fl-r'>
        Login now!
      </Link>
    </Form>
  );
};

export default Register;
