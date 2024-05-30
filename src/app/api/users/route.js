import { NextResponse } from 'next/server';
import connectDB from '@/config/dbConfig';
import User from '@/models/userModel';
import { getUserIdAndRoleByValidToken } from '@/util/Util';

connectDB();

export async function GET(request) {
  try {
    const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);

    if (role === 'admin') {
      const users = await User.find({}).select('-password');
      return NextResponse.json({ message: 'Users info fethed successfully', data: users }, { status: 200 });
    } else {
      // if request is not from admin, throw an error with the message
      throw new Error('You are not authorized to get this request');
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
