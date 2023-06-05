const treeModel = require('../models/treeModel');

exports.treeCreate = async (req, res, next) => {
  const { tenCay, GiaiDoan } = req.body;

  await treeModel.create({ tenCay, giaiDoan: GiaiDoan });
  res.end();
};

exports.treeGetAll = async (req, res, next) => {
  const trees = await treeModel.find().populate('giaiDoan.benh');

  res.send(JSON.stringify(trees));
};
