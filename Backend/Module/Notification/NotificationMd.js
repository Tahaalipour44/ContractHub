import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    contract_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
      required: true
    },
    message: { type: String, required: true },
    is_read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;
