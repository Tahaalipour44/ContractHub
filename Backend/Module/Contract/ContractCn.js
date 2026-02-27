import ApiFeatures, { catchAsync, HandleERROR } from 'vanta-api';
import Contract from './ContractMd.js';
import ContractVersion from '../ContractVersion/ContractVersionMd.js';
import Party from '../Party/PartyMd.js';

export const getAll = catchAsync(async (req, res) => {
  const futures = new ApiFeatures(Contract, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: 'created_by', select: 'username email' });
  const result = await futures.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res) => {
  const futures = new ApiFeatures(Contract, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: 'created_by', select: 'username email' });
  const result = await futures.execute();
  if (!result.data.length) {
    throw new HandleERROR('Contract not found', 404);
  }
  return res.status(200).json(result);
});

export const create = catchAsync(async (req, res) => {
  const contract = await Contract.create({
    ...req.body,
    created_by: req.userId
  });
  await ContractVersion.create({
    contract_id: contract._id,
    version_number: 1,
    content: req.body.description || ''
  });
  return res.status(201).json({
    status: 'success',
    data: contract,
    message: 'Contract created successfully'
  });
});

export const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const contract = await Contract.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  if (!contract) {
    throw new HandleERROR('Contract not found', 404);
  }
  return res.status(200).json({
    status: 'success',
    data: contract,
    message: 'Contract updated successfully'
  });
});

export const changeStatus = catchAsync(async (req, res) => {
  const contract = await Contract.findById(req.params.id);
  if (!contract) {
    throw new HandleERROR('Contract not found', 404);
  }
  const allowedTransitions = {
    Draft: ['Active'],
    Active: ['Completed', 'Cancelled'],
    Completed: [],
    Cancelled: []
  };
  if (!allowedTransitions[contract.status].includes(req.body.status)) {
    throw new HandleERROR(
      `Cannot change status from ${contract.status} to ${req.body.status}`,
      400
    );
  }
  contract.status = req.body.status;
  const updatedContract = await contract.save();
  return res.status(200).json({
    status: 'success',
    data: updatedContract,
    message: 'Contract status updated successfully'
  });
});

export const remove = catchAsync(async (req, res) => {
  const { id } = req.params;
  const parties = await Party.find({ contract_id: id });
  if (parties.length > 0) {
    throw new HandleERROR('Cannot delete contract with existing parties', 400);
  }
  const contract = await Contract.findByIdAndDelete(id);
  return res.status(204).json({
    status: 'success',
    data: contract,
    message: 'Contract deleted successfully'
  });
});
