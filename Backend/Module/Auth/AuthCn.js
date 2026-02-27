import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { catchAsync, HandleERROR } from 'vanta-api';
import User from '../User/UserMd.js';

export const register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new HandleERROR('All fields are required', 400));
  }

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return next(
      new HandleERROR(
        'Password must be at least 8 characters and contain A-Z, a-z, 0-9',
        400
      )
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new HandleERROR('Email already exists', 400));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashPassword
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  res.status(201).json({
    success: true,
    token,
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email
    }
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HandleERROR('Email and password are required', 400));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new HandleERROR('Invalid email or password', 401));
  }
  const isMatch = bcryptjs.compareSync(password, user.password);
  if (!isMatch) {
    return next(new HandleERROR('Invalid email or password', 401));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });
});
