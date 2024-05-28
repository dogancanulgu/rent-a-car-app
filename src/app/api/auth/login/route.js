import { NextResponse } from 'next/server';
import connectDB from '@/config/dbConfig';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

export async function POST(request) {
  try {
    const userInfo = await request.json();

    // all fields must be filled
    if (!userInfo.email || !userInfo.password) {
      throw new Error('Please fill all fields');
    }

    const user = await User.findOne({ email: userInfo.email });

    // user must be exist
    if (!user) {
      throw new Error('User not found');
    }

    // throw Error if the user is not active
    if (!user.active) {
      throw new Error('User is not active. Please contact the admin');
    }

    // password must be matched
    const isPasswordMatched = await bcrypt.compare(userInfo.password, user.password);
    if (!isPasswordMatched) {
      throw new Error('Password is incorrect');
    }

    // // there is a logic to make more safety
    // if (!user || !isPasswordMatched) {
    //   throw new Error('User not found or password is incorrect');
    // }

    // all fields are correct. create token
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // set token
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
    response.cookies.set('token', token, { httpOnly: true, path: '/' });

    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
