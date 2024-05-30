import connectDB from '@/config/dbConfig';
import Booking from '@/models/bookingModel';
import { getUserIdAndRoleByValidToken } from '@/util/Util';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

connectDB();

export async function GET(request) {
  try {
    const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);

    let bookingList = [];

    // get all filters from parameters
    const filter = Object.fromEntries(request.nextUrl.searchParams.entries());

    if (role == 'user') {
      filter.userId = userId;

      // get booking details and related car and user details according to filter (without password for security purposes)
      bookingList = await Booking.find(filter).populate('carId').populate('userId', '-password');
    }

    if (role == 'owner') {
      bookingList = await Booking.aggregate([
        {
          $lookup: {
            from: 'cars',
            localField: 'carId',
            foreignField: '_id',
            as: 'carId',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userId',
          },
        },
        { $unwind: '$carId' },
        { $unwind: '$userId' },
        {
          $match: {
            'carId.owner': new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $project: {
            'userId.password': 0,
          },
        },
      ]);
    }

    if (role == 'admin') {
      bookingList = await Booking.find(filter).populate('carId').populate('userId', '-password');
    }

    return NextResponse.json(
      { message: 'Booking list is fetched successfully', data: bookingList },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);
    const bookingInfo = await request.json();
    bookingInfo.userId = userId;

    // create customer for stripe
    const customer = await stripe.customers.create({
      email: bookingInfo.email,
      source: bookingInfo.token.id,
    });

    // check payment
    const payment = await stripe.charges.create(
      {
        amount: bookingInfo.totalPrice * 100,
        currency: 'TRY',
        customer: customer.id,
        receipt_email: bookingInfo.email,
      },
      { idempotencyKey: bookingInfo.token.id }
    );

    // set payment id
    bookingInfo.paymentId = payment.id;

    await Booking.create(bookingInfo);
    return NextResponse.json({ message: 'Booking is created successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
