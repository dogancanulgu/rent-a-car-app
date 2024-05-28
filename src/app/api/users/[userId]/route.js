import connectDB from '@/config/dbConfig';
import User from '@/models/userModel';
import { getUserIdAndRoleByValidToken } from '@/util/Util';
import { NextResponse } from 'next/server';

connectDB();

export async function PUT(request, { params }) {
  try {
    const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);

    if (role == 'admin') {
      const newUserInfo = await request.json();
      await User.findByIdAndUpdate(params.userId, newUserInfo);
      return NextResponse.json({ message: 'User is updated successfully' }, { status: 200 });
    } else {
      throw new Error('You are not authorized to update this user');
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
