import { NextResponse } from 'next/server';
import connectDB from '@/config/dbConfig';

// MongoDb Connection
connectDB();

export async function GET() {
  return NextResponse.json({ message: 'First Response' }, { status: 200 });
}
