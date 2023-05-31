const gardenModel = require('../models/gardenModel');

exports.createGarden = async (req, res, next) => {
  const { gardenName, gardenArea, gardenAddress } = req.body;
  const newGarden = await gardenModel.create({
    gardenArea,
    gardenName,
    address: gardenAddress,
  });
  res.end();
};

exports.getAllGarden = async (req, res, next) => {
  const gardens = await gardenModel.find({});
  res.send(JSON.stringify(gardens));
  res.end();
};
