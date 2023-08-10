const treeModel = require('../models/treeModel');

exports.treeCreate = async (req, res, next) => {
  const { tenCay, GiaiDoan } = req.body;
  const images = [...req.files];
  await treeModel.create({ tenCay, giaiDoan: GiaiDoan });
  res.end();
};

exports.newProduct = async (req, res, next) => {
  const { name, price, short_desc, long_desc, category } = req.body;
  const images = [...req.files];
  console.log(req.files[0].path);
  const newProduct = new productsModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    price,
    long_desc,
    short_desc,
    category,
    img1: images[0] ? `${baseURL}/${images[0].path}` : '',
  });
  await newProduct.save();
  res.end();
};

exports.treeGetAll = async (req, res, next) => {
  const trees = await treeModel.find().populate('giaiDoan.benh');
  res.send(JSON.stringify(trees));
};
