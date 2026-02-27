import bcryptjs from 'bcryptjs';
import ApiFeatures, { catchAsync, HandleERROR } from 'vanta-api';
import User from './UserMd.js';

export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req.query, req.role)
  .addManualFilters({_id: req.userId,});
  const result = await features.execute();
  return res.status(200).json(result);
});

export const remove = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.userId);
  if (!user) {
    return next(new HandleERROR('user not found', 404));
  }
  return res.status(200).json({
    success: true,
    message: 'user deleted successfully'
  });
});

export const update = catchAsync(async (req, res, next) => {
  const { password = null, ...otherData } = req.body;
  const user = await User.findByIdAndUpdate(req.userId, otherData, {
    new: true,
    runValidators: true
  });
  return res.status(200).json({
    success: true,
    data: user
  });
});

export const changePassword = catchAsync(async (req, res, next) => {
  const { oldPassword = null, newPassword = null } = req.body;
  const user = await User.findById(req.userId);
  const isMatch = bcryptjs.compareSync(oldPassword, user.password);
  if (!isMatch) {
    return next(new HandleERROR("old password doesn't match", 404));
  }
  const hashPassword = bcryptjs.hashSync(newPassword, 10);
  user.password = hashPassword;
  const newUser = await user.save();
  return res.status(200).json({
    data: newUser,
    success: true,
    message: 'password change successfully'
  });
});
