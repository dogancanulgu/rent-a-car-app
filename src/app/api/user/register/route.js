import connectDB from '@/config/dbConfig';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

connectDB();

export async function POST(request) {
  try {
    const newUser = await request.json();

    // all fields must be filled
    if (!newUser.email || !newUser.password || !newUser.name || !newUser.surname) {
      throw new Error('Please fill all fields');
    }

    // check there is not a user with the same email
    const userExists = await User.findOne({ email: newUser.email });
    if (userExists) {
      throw new Error('User already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;

    // all information suitable. create user
    await User.create(newUser);

    return Response.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
