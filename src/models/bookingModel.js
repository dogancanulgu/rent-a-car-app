import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'car',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['approved', 'cancelled'],
      default: 'approved',
    },
  },
  {
    timestamps: true,
  }
);

// control if there is booking model which is already created
if (mongoose.models.bookings) {
  const bookingModel = mongoose.model('bookings');
  mongoose.deleteModel(bookingModel.modelName);
}

const Booking = mongoose.model('bookings', bookingSchema);

export default Booking;
