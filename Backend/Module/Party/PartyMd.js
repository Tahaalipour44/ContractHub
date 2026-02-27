import mongoose from 'mongoose';

const PartySchema = new mongoose.Schema(
  {
    contract_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
      required: true
    },
    name: { type: String, required: true },
    role: { type: String, enum: ['Employer', 'Contractor'], required: true },
    email: { type: String },
    phone: { type: String }
  },
  { timestamps: true }
);

const Party = mongoose.model('Party', PartySchema);
export default Party;
