import ApiFeatures, { catchAsync, HandleERROR } from 'vanta-api';
import Party from './PartyMd.js';
import Contract from '../Contract/ContractMd.js';

export const getAll = catchAsync(async (req, res) => {
  const futures = new ApiFeatures(Party, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: 'contract_id', select: 'title status' });
  const result = await futures.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res) => {
  const futures = new ApiFeatures(Party, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: 'contract_id', select: 'title status' });
  const result = await futures.execute();
  if (!result.data.length) {
    throw new HandleERROR('Party not found', 404);
  }
  return res.status(200).json(result);
});

export const create = catchAsync(async (req, res) => {
  const contract = await Contract.findById(req.body.contract_id);
  if (!contract) {
    throw new HandleERROR('Parent contract not found', 404);
  }
  const party = await Party.create({
    contract_id: req.body.contract_id,
    name: req.body.name,
    role: req.body.role,
    email: req.body.email
  });
  return res.status(201).json({
    status: 'success',
    data: party,
    message: 'Party created successfully'
  });
});

export const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const party = await Party.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  if (!party) {
    throw new HandleERROR('Party not found', 404);
  }
  return res.status(200).json({
    status: 'success',
    data: party,
    message: 'Party updated successfully'
  });
});

export const remove = catchAsync(async (req, res) => {
  const party = await Party.findById(req.params.id);
  if (!party) {
    throw new HandleERROR('Party not found', 404);
  }
  await Party.findByIdAndDelete(req.params.id);
  return res.status(204).json({
    status: 'success',
    data: party,
    message: 'Party deleted successfully'
  });
});
