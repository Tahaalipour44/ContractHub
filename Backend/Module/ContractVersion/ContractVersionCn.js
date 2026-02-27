import ApiFeatures, { catchAsync, HandleERROR } from 'vanta-api';
import ContractVersion from './ContractVersionMd.js';
import Contract from '../Contract/ContractMd.js';

export const getAll = catchAsync(async (req, res) => {
  const futures = new ApiFeatures(ContractVersion, req.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: 'contract_id', select: 'title status' });
  const result = await futures.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res) => {
  const futures = new ApiFeatures(ContractVersion, req.query, req.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate({ path: 'contract_id', select: 'title status' });
  const result = await futures.execute();
  if (!result.data.length) {
    throw new HandleERROR('Contract version not found', 404);
  }
  return res.status(200).json(result);
});

export const create = catchAsync(async (req, res) => {
  const contract = await Contract.findById(req.body.contract_id);
  if (!contract) {
    throw new HandleERROR('Parent contract not found', 404);
  }
  const lastVersion = await ContractVersion.find({
    contract_id: req.body.contract_id
  })
    .sort({ version_number: -1 })
    .limit(1);
  const versionNumber = lastVersion.length
    ? lastVersion[0].version_number + 1
    : 1;
  const newVersion = await ContractVersion.create({
    contract_id: req.body.contract_id,
    version_number: versionNumber,
    content: req.body.content
  });
  return res.status(201).json({
    status: 'success',
    data: newVersion,
    message: 'Contract version created successfully'
  });
});

export const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const version = await ContractVersion.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  if (!version) {
    throw new HandleERROR('Contract version not found', 404);
  }
  return res.status(200).json({
    status: 'success',
    data: version,
    message: 'Contract version updated successfully'
  });
});

export const remove = catchAsync(async (req, res) => {
  const version = await ContractVersion.findById(req.params.id);
  if (!version) {
    throw new HandleERROR('Contract version not found', 404);
  }
  await ContractVersion.findByIdAndDelete(req.params.id);
  return res.status(204).json({
    status: 'success',
    data: version,
    message: 'Contract version deleted successfully'
  });
});
