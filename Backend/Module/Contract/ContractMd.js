import mongoose from 'mongoose';

const ContractSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    description: {
      type: String
    },
    contract_number: {
      type: String,
      required: [true, 'Contract number is required'],
      unique: true
    },
    amount: {
      type: Number
    },
    start_date: {
      type: Date
    },
    end_date: {
      type: Date
    },
    status: {
      type: String,
      enum: ['Draft', 'Active', 'Completed', 'Cancelled'],
      required: [true, 'Status is required'],
      default: 'Draft'
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

const Contract = mongoose.model('Contract', ContractSchema);
export default Contract;
