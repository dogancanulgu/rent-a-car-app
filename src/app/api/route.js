import connectDB from '@/config/dbConfig';

// MongoDb Connection
connectDB();

export async function GET() {
  return Response.json({ message: 'First Response' }, { status: 200 });
}
