import { NextResponse } from 'next/server';
import connectDB from '@/config/dbConfig';
import User from '@/models/userModel';
import { getUserIdAndRoleByValidToken } from '@/util/Util';

connectDB();

export async function GET(request) {
  try {
    const { _id: userId, role } = await getUserIdAndRoleByValidToken(request);
    const user = await User.findById(userId).select('-password');

    return NextResponse.json({ data: user, message: 'User info fethed successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
