import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Link from 'next/link';

const Login = ({ onFinish }) => {
  return (
    <Form
      name='login'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
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
        <FormItem name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </FormItem>

        <Link href='/renew-password' className='fl-r'>
          Forgot password
        </Link>
      </FormItem>

      <FormItem>
        <Button type='primary' htmlType='submit' className='fullWidth'>
          Log in
        </Button>
      </FormItem>
      <Link href='/register' className='fl-r'>
        Register now!
      </Link>
    </Form>
  );
};

export default Login;
