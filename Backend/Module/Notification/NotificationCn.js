import ApiFeatures, { catchAsync, HandleERROR } from 'vanta-api';
import Notification from './NotificationMd.js';
import User from '../User/UserMd.js';

export const getAll = catchAsync(async (req, res) => {
  const futures = new ApiFeatures(Notification, req.query, req.role)
    .addManualFilters({ userId: req.userId })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: 'senderId', select: 'username email' });
  const result = await futures.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res) => {
  const futures = new ApiFeatures(Notification, req.query, req.role)
    .addManualFilters({ _id: req.params.id, userId: req.userId })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: 'senderId', select: 'username email' });
  const result = await futures.execute();
  if (!result.data.length) {
    throw new HandleERROR('Notification not found', 404);
  }
  return res.status(200).json(result);
});

export const create = catchAsync(async (req, res) => {
  const receiver = await User.findById(req.body.userId);
  if (!receiver) {
    throw new HandleERROR('Receiver user not found', 404);
  }
  const notification = await Notification.create({
    userId: req.body.userId,
    senderId: req.userId,
    title: req.body.title,
    message: req.body.message,
    isRead: false
  });
  return res.status(201).json({
    status: 'success',
    data: notification,
    message: 'Notification created successfully'
  });
});

export const markAsRead = catchAsync(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    throw new HandleERROR('Notification not found', 404);
  }
  notification.isRead = true;
  const updatedNotification = await notification.save();
  return res.status(200).json({
    status: 'success',
    data: updatedNotification,
    message: 'Notification marked as read'
  });
});

export const remove = catchAsync(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    throw new HandleERROR('Notification not found', 404);
  }
  await Notification.findByIdAndDelete(req.params.id);
  return res.status(204).json({
    status: 'success',
    data: notification,
    message: 'Notification deleted successfully'
  });
});
