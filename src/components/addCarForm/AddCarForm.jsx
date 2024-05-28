import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider, InputNumber } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import Link from 'next/link';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const AddCarForm = ({ initialValues, onFinish, isEdit }) => {
  return (
    <Form name='addCarForm' {...formItemLayout} initialValues={initialValues} onFinish={onFinish}>
      <FormItem label='Make' name='make'>
        <Input placeholder='make' disabled />
      </FormItem>
      <FormItem label='Model' name='model'>
        <Input placeholder='model' disabled />
      </FormItem>
      <FormItem label='Year' name='year'>
        <Input placeholder='year' disabled />
      </FormItem>
      <FormItem label='Fuel' name='fuel'>
        <Input placeholder='fuel' disabled />
      </FormItem>
      <FormItem label='Seats' name='seats'>
        <Input placeholder='seats' disabled />
      </FormItem>
      <FormItem label='Doors' name='doors'>
        <Input placeholder='doors' disabled />
      </FormItem>
      <FormItem
        label='Description'
        name='description'
        rules={[
          {
            required: true,
            message: 'Please input description of your car!',
          },
        ]}
      >
        <Input placeholder='price' />
      </FormItem>
      <FormItem
        label='Price'
        name='price'
        rules={[
          {
            required: true,
            message: 'Please input daily price of your car!',
          },
        ]}
      >
        <Input placeholder='price' />
      </FormItem>
      <FormItem
        label='Images'
        name='images'
        rules={[
          {
            required: true,
            message: 'Please add image url of your car!',
          },
        ]}
      >
        <Input placeholder='image' />
      </FormItem>
      <FormItem>
        <FormItem label='Active' name='active' valuePropName='checked' noStyle>
          <Checkbox>Active</Checkbox>
        </FormItem>
      </FormItem>

      <FormItem>
        <Button type='primary' htmlType='submit' className='fullWidth'>
          {isEdit ? 'Edit Car' : 'Add Car'}
        </Button>
      </FormItem>
    </Form>
  );
};

export default AddCarForm;
