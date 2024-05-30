'use client';
import React, { useEffect, useState } from 'react';
import { Descriptions, Flex, Image, DatePicker, Button, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadingSlice';
import dayjs from 'dayjs';
import StripeCheckout from 'react-stripe-checkout';
import { useTranslation } from 'react-i18next';

const { PreviewGroup } = Image;
const { RangePicker } = DatePicker;

const CarInfo = ({ params }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [carDetails, setCarDetails] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    getCarDetail();
  }, []);

  const getCarDetail = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`/api/car/${params.carId}`);
      setCarDetails(response.data.data);
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const checkIsAvailable = async () => {
    try {
      const payload = {
        carId: params.carId,
        startTime,
        endTime,
      };
      dispatch(setLoading(true));
      const response = await axios.post('/api/bookings/checkAvailability', payload);
      setIsAvailable(true);
      message.success(t(response.data.message));
    } catch (error) {
      setIsAvailable(false);
      message.error(t(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const bookNow = async (token) => {
    try {
      const totalDays = calculateDays();
      const payload = {
        carId: params.carId,
        startTime,
        endTime,
        totalDays,
        totalPrice: totalDays * carDetails.price,
        token,
      };
      dispatch(setLoading(true));
      const response = await axios.post('/api/bookings', payload);
      message.success(t(response.data.message));
      router.push('/bookings');
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const calculateDays = () => {
    const minutes = dayjs(endTime).diff(dayjs(startTime), 'minutes');
    return Math.ceil(minutes / (24 * 60));
  };

  const summaryItems = [
    // {
    //   key: '1',
    //   label: 'Start Time',
    //   children: <p>{startTime}</p>,
    // },
    // {
    //   key: '2',
    //   label: 'End Time',
    //   children: <p>{endTime}</p>,
    // },
    {
      key: '3',
      label: t('Total Days'),
      children: <p>{calculateDays()}</p>,
    },
    {
      key: '4',
      label: t('Total Price'),
      children: <p>{calculateDays() * carDetails.price} TL</p>,
    },
  ];
  const items = [
    {
      key: '1',
      label: t('Make'),
      children: <p>{carDetails.make}</p>,
    },
    {
      key: '2',
      label: t('Model'),
      children: <p>{carDetails.model}</p>,
    },
    {
      key: '3',
      label: t('Year'),
      children: <p>{carDetails.year}</p>,
    },
    {
      key: '4',
      label: t('Fuel'),
      children: <p>{carDetails.fuel}</p>,
    },

    {
      key: '5',
      label: t('Seats'),
      children: <p>{carDetails.seats}</p>,
    },
    {
      key: '6',
      label: t('Doors'),
      children: <p>{carDetails.doors}</p>,
    },
    // {
    //   key: '7',
    //   label: 'Price',
    //   children: <p>{carDetails.price}</p>,
    // },
    // {
    //   key: '8',
    //   label: 'Description',
    //   children: <p>{carDetails.description}</p>,
    // },
  ];

  return Object.keys(carDetails).length > 0 ? (
    <Flex vertical gap={15}>
      <div style={{ textAlign: 'center' }}>
        <PreviewGroup items={carDetails.images}>
          <Image width='calc(min(90%, 500px))' height={250} src={carDetails.images?.[0]} />
        </PreviewGroup>
      </div>
      <Descriptions title={t('Car Details')} items={items} />
      <div>{carDetails.description}</div>
      <Flex gap={15} justify='center'>
        <RangePicker
          disabledDate={(current) => current && current < dayjs()}
          showTime={{ format: 'HH:mm' }}
          format='YYYY-MM-DD HH:mm'
          onChange={(value) => {
            setIsAvailable(false);
            setStartTime(value ? value[0].toDate() : null);
            setEndTime(value ? value[1].toDate() : null);
          }}
        />
        <Button type='primary' disabled={!startTime || !endTime} onClick={checkIsAvailable}>
          {t('Check Availability')}
        </Button>
        <StripeCheckout
          amount={calculateDays() * carDetails.price * 100}
          currency='TRY'
          stripeKey='pk_test_x4tJcN3lUuP15pWIPVaZb17e00tC3bf7fz'
          token={bookNow}
        >
          <Button type='primary' disabled={!startTime || !endTime || !isAvailable}>
            {t('Book Now')}
          </Button>
        </StripeCheckout>
      </Flex>
      {startTime && endTime && <Descriptions title={t('Rent Summary')} items={summaryItems} />}
    </Flex>
  ) : null;
};

export default CarInfo;
