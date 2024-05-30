'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, Card, Flex, message } from 'antd';
const { Meta } = Card;
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loadingSlice';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    getCarList();
  }, []);

  const getCarList = async () => {
    try {
      dispatch(setLoading(true));
      // const response = await axios.get('/api/cars', { params: { active: true } });
      const response = await axios.get('/api/cars', { params: { active: true } });
      message.success(t(response.data.message));
      setCarList(response.data.data);
    } catch (error) {
      message.error(t(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <h1>{t('Car List')}</h1>
      <Flex wrap='wrap' justify='center' gap={15}>
        {carList.map((car) => (
          <Card
            hoverable
            style={{ width: 240 }}
            onClick={() => router.push(`/cars/${car._id}`)}
            cover={
              <img
                alt='example'
                src={car.images.at(0)}
                style={{
                  objectFit: 'cover',
                  height: '130px',
                }}
              />
            }
          >
            <Meta
              title={`${car.make} ${car.model} ${car.year}`}
              description={`${car.fuel} ${car.price} TL`}
            />
          </Card>
        ))}
      </Flex>
    </>
  );
};

export default HomePage;
