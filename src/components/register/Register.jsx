import React from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Link from 'next/link';

const Register = ({ onFinish }) => {
  return (
    <Form
      name='register'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
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
