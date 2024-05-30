import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = NextResponse.json({ message: 'User logged out successfully.' }, { status: 200 });

    // delete cookies
    // response.cookies.delete('token');
    response.cookies.set('token', '', { httpOnly: true, secure: true, path: '/', expires: new Date(0) });

    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
