import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username must be unique']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email must be unique'],
      match: [
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        'Please use a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    phone: {
      type: String,
      unique: [true, 'Phone number must be unique'],
      match: [/^\+?98\d{10}$|^0\d{10}$/, 'Please use a valid phone number']
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
