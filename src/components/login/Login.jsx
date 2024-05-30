import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Login = ({ onFinish }) => {
  const { t } = useTranslation();

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
            message: t('Please input your Email!'),
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder={t('Email')} />
      </FormItem>
      <FormItem
        name='password'
        rules={[
          {
            required: true,
            message: t('Please input your Password!'),
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} type='password' placeholder={t('Password')} />
      </FormItem>
      {/* <FormItem>
        <FormItem name='remember' valuePropName='checked' noStyle>
          <Checkbox>{t('Remember me')}</Checkbox>
        </FormItem>

        <Link href='/renew-password' className='fl-r'>
          {t('Forgot password')}
        </Link>
      </FormItem> */}

      <FormItem>
        <Button type='primary' htmlType='submit' className='fullWidth'>
          {t('Log in')}
        </Button>
      </FormItem>
      <Link href='/register' className='fl-r'>
        {t('Register now!')}
      </Link>
    </Form>
  );
};

export default Login;
