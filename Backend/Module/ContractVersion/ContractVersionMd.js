import mongoose from 'mongoose';

const ContractVersionSchema = new mongoose.Schema(
  {
    contract_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contract',
      required: true
    },
    version_number: {
      type: Number,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const ContractVersion = mongoose.model(
  'ContractVersion',
  ContractVersionSchema
);
export default ContractVersion;
