import connectDB from '@/config/dbConfig';
import Booking from '@/models/bookingModel';
import { getUserIdAndRoleByValidToken } from '@/util/Util';
import { NextResponse } from 'next/server';

connectDB();

export async function POST(request) {
  try {
    const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);
    const bookingInfo = await request.json();
    const { startTime, endTime, carId } = bookingInfo;

    // check if user has another available appointment or not
    const isUserUnavailable = await Booking.findOne({
      userId,
      status: 'approved',
      $or: [
        { startTime: { $lte: startTime }, endTime: { $gte: startTime } },
        { startTime: { $lte: endTime }, endTime: { $gte: endTime } },
        { startTime: { $gte: startTime }, endTime: { $lte: endTime } },
      ],
    });

    // give error if user has another available appointment
    if (isUserUnavailable) {
      throw new Error('You have another available appointment');
    }

    // check if car is available or not
    const isCarUnavailable = await Booking.findOne({
      carId,
      status: 'approved',
      $or: [
        { startTime: { $lte: startTime }, endTime: { $gte: startTime } },
        { startTime: { $lte: endTime }, endTime: { $gte: endTime } },
        { startTime: { $gte: startTime }, endTime: { $lte: endTime } },
      ],
    });

    // give error if car is not available
    if (isCarUnavailable) {
      throw new Error('Car is not available');
    }

    return NextResponse.json({ message: 'Booking is available' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
