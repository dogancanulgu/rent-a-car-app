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

    // password must be matched
    const isPasswordMatched = await bcrypt.compare(userInfo.password, user.password);
    if (!isPasswordMatched) {
      throw new Error('Password is incorrect');
    }

    // // there is a logic to make more safety
    // if (!user || !isPasswordMatched) {
    //   throw new Error('User not found or password is incorrect');
    // }

    // all field correct. create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return Response.json(
      { message: 'Login successful' },
      { status: 200, headers: { 'Set-Cookie': `token=${token}` } }
    );
  } catch (error) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
