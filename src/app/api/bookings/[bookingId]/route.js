import connectDB from '@/config/dbConfig';
import Booking from '@/models/bookingModel';
import { getUserIdAndRoleByValidToken } from '@/util/Util';
import { NextResponse } from 'next/server';

connectDB();

export async function PUT(request, { params }) {
  try {
    const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);

    if (role == 'user') {
      throw new Error('You are not authorized to update this booking');
    }

    const bookingId = params.bookingId;
    const newBookingInfo = await request.json();

    await Booking.findByIdAndUpdate(bookingId, newBookingInfo);

    return NextResponse.json({ message: 'Booking is updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
