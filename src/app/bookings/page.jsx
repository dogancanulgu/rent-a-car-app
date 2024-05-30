'use client';
import React, { useEffect, useState } from 'react';
import { Descriptions, Flex, Image, DatePicker, Button, message, Table, Popconfirm, Empty } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadingSlice';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const Bookings = () => {
  const { t } = useTranslation();
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
      message.error(t(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.put(`/api/bookings/${bookingId}`, { status: 'cancelled' });
      message.success(t(response.data.message));
      getBookingList();
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const columns = [
    {
      title: t('Booking Id'),
      dataIndex: '_id',
    },
    {
      title: t('Rental Name Surname'),
      dataIndex: 'userId',
      render: (user) => `${user.name} ${user.surname}`,
    },
    {
      title: t('Car Make'),
      dataIndex: 'carId',
      render: (car) => car.make,
    },
    {
      title: t('Car Model'),
      dataIndex: 'carId',
      render: (car) => car.model,
    },
    {
      title: t('Total Days'),
      dataIndex: 'totalDays',
    },
    {
      title: t('Total Price'),
      dataIndex: 'totalPrice',
    },
    {
      title: t('Start Time'),
      dataIndex: 'startTime',
      render: (startTime) => dayjs(startTime).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: t('End Time'),
      dataIndex: 'endTime',
      render: (endTime) => dayjs(endTime).format('DD-MM-YYYY HH:mm:ss'),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      render: (status) => t(status),
    },
    {
      title: t('Action'),
      render: (_, record) =>
        record.status === 'approved' ? (
          <Popconfirm
            title={t('Cancel the booking')}
            description={t('Are you sure to cancel this booking?')}
            okText={t('Yes')}
            cancelText={t('No')}
            onConfirm={() => cancelBooking(record._id)}
          >
            <Button danger>{t('Cancel')}</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <>
      <h1>{t('Bookings')}</h1>
      <Table
        scroll={{ x: 'max-content' }}
        dataSource={bookingList}
        columns={columns}
        rowKey='_id'
        locale={{ emptyText: <Empty description={t('No Data')} /> }}
      />
    </>
  );
};

export default Bookings;
