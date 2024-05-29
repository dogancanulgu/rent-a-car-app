import { NextResponse } from 'next/server';
import connectDB from '@/config/dbConfig';
import Car from '@/models/carModel';
import { getUserIdAndRoleByValidToken } from '@/util/Util';

// get the car detail by car id
export async function GET(request, { params }) {
  try {
    const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);

    // get car detail by car id
    const carList = await Car.findById(params.carId);

    return NextResponse.json({ message: 'Car list is fetched successfully', data: carList }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// delete the car by car id
export async function DELETE(request, { params }) {
  try {
    const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);
    // const carInfo = await request.json()
    if (role === 'user') {
      throw new Error('You are not authorized to delete the car');
    }

    // if the car is not owned by the user, then throw an error
    if (role === 'owner') {
      const car = await Car.findById(params.carId);
      if (car.owner.toString() !== userId) {
        throw new Error('You are not authorized to delete the car which is not owned by the user');
      }
    }

    await Car.findByIdAndDelete(params.carId);

    return NextResponse.json({ message: 'Car is deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);
    if (role === 'user') {
      throw new Error('You are not authorized to update the car');
    }

    // if the car is not owned by the user, then throw an error
    if (role === 'owner') {
      const car = await Car.findById(params.carId);
      if (car.owner.toString() !== userId) {
        throw new Error('You are not authorized to update the car which is not owned by the user');
      }
    }
    const carInfo = await request.json();

    await Car.findByIdAndUpdate(params.carId, carInfo);

    return NextResponse.json({ message: 'Car is updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
