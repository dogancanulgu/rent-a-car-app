import connectDB from '@/config/dbConfig';
import User from '@/models/userModel';
import { getUserIdAndRoleByValidToken } from '@/util/Util';
import { NextResponse } from 'next/server';

connectDB();

export async function PUT(request, { params }) {
  try {
    const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);

    const newUserInfo = await request.json();
    if (role == 'admin') {
      await User.findByIdAndUpdate(params.userId, newUserInfo);
      return NextResponse.json({ message: 'User is updated successfully' }, { status: 200 });
    } else {
      // user and owner can update only own profile
      const user = await User.findById(params.userId);
      if (user._id.toString() === userId) {
        await User.findByIdAndUpdate(params.userId, newUserInfo);
        return NextResponse.json({ message: 'User is updated successfully' }, { status: 200 });
      } else {
        throw new Error('You are not authorized to update the user which is not own profile');
      }
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
