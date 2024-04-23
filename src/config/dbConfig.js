import mongoose from 'mongoose';

export default function connectDB() {
  // Connect to the MongoDB database
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((error) => {
      console.error('Error connecting to the database:', error);
    });
}
