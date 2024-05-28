'use client';
import React, { useEffect, useState } from 'react';
import { Descriptions, Flex, Image, DatePicker, Button, message, Table, Popconfirm } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadingSlice';
import dayjs from 'dayjs';

const Bookings = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    getBookingList();
  }, []);

  const getBookingList = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('/api/bookings');
      setBookingList(response.data.data);
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.put(`/api/bookings/${bookingId}`, { status: "cancelled" });
      message.success(response.data.message);
      getBookingList();
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const columns = [
    {
      title: 'Booking Id',
      dataIndex: '_id',
    },
    {
      title: 'Rental Name Surname',
      dataIndex: 'userId',
      render: (user) => `${user.name} ${user.surname}`,
    },
    {
      title: 'Car Make',
      dataIndex: 'carId',
      render: (car) => car.make,
    },
    {
      title: 'Car Model',
      dataIndex: 'carId',
      render: (car) => car.model,
    },
    {
      title: 'Total Days',
      dataIndex: 'totalDays',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      render: (startTime) => dayjs(startTime).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      render: (endTime) => dayjs(endTime).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => status.toUpperCase(),
    },
    {
      title: 'Action',
      render: (_, record) =>
        record.status === 'approved' ? (
          <Popconfirm
            title='Cancel the booking'
            description='Are you sure to cancel this booking?'
            okText='Yes'
            cancelText='No'
            onConfirm={() => cancelBooking(record._id)}
          >
            <Button danger>Cancel</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <>
      <h1>Bookings</h1>
      <Table scroll={{ x: 'max-content' }} dataSource={bookingList} columns={columns} rowKey='_id' />
    </>
  );
};

export default Bookings;
