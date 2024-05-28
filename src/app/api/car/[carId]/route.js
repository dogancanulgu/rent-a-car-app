import { NextResponse } from 'next/server';
import connectDB from '@/config/dbConfig';
import Car from '@/models/carModel';
import { getUserIdAndRoleByValidToken } from '@/util/Util';

// get the car detail by car id
export async function GET(request, { params }) {
  try {
    // const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);
    // const carInfo = await request.json()

    // get car detail by car id
    const carList = await Car.findById(params.carId);

    return NextResponse.json({ message: 'Car list is fetched successfully', data: carList }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    // const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);
    // const carInfo = await request.json()

    await Car.findByIdAndDelete(params.carId);

    return NextResponse.json({ message: 'Car is deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  try {
    // const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);
    const carInfo = await request.json();

    await Car.findByIdAndUpdate(params.carId, carInfo);

    return NextResponse.json({ message: 'Car is updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
