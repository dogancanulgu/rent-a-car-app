'use client';
import React, { useEffect, useState } from 'react';
import { Descriptions, Flex, Image, DatePicker, Button, message, Table, Popconfirm } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadingSlice';
import dayjs from 'dayjs';

const UserPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('/api/users');
      setUsers(response.data.data);
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const changeUserActivation = async (id, active) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.put(`/api/users/${id}`, { active: !active });
      message.success(response.data.message);
      getAllUsers();
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const columns = [
    {
      title: 'User Id',
      dataIndex: '_id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
    },
    {
      title: 'Language',
      dataIndex: 'language',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      render: (time) => dayjs(time).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: 'Updated Date',
      dataIndex: 'updatedAt',
      render: (time) => dayjs(time).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: 'Active',
      dataIndex: 'active',
      render: (active) => (active ? 'Yes' : 'No'),
    },
    {
      title: 'Action',
      render: (_, { _id, active }) => (
        <Popconfirm
          title='Change the user activation'
          description='Are you sure to change user activation?'
          okText='Yes'
          cancelText='No'
          onConfirm={() => changeUserActivation(_id, active)}
        >
          <Button danger>{active ? 'Blocked' : 'Approved'}</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <h1>All Users</h1>
      <Table scroll={{ x: 'max-content' }} dataSource={users} columns={columns} />
    </>
  );
};

export default UserPage;
