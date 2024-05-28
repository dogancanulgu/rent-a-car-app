import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'owner', 'admin'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      enum: ['tr', 'en'],
      default: 'tr',
    },
  },
  {
    timestamps: true,
  }
);

// control if there is user model which is already created
if (mongoose.models.user) {
  const userModel = mongoose.model('user');
  mongoose.deleteModel(userModel.modelName);
}

const User = mongoose.model('user', userSchema);

export default User;
