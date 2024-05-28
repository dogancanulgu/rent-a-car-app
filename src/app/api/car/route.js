import { NextResponse } from 'next/server';
import connectDB from '@/config/dbConfig';
import Car from '@/models/carModel';
import { getUserIdAndRoleByValidToken } from '@/util/Util';

connectDB();

export async function POST(request) {
  try {
    const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);
    const requestInfo = await request.json();
    requestInfo.owner = userId;

    const car = await Car.create(requestInfo);
    return NextResponse.json({ message: 'Car created successfully', data: car }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
