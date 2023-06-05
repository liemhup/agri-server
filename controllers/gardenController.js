const gardenModel = require('../models/gardenModel');

exports.createGarden = async (req, res, next) => {
  const { gardenName, gardenArea, gardenAddress, owner, selectedFarmers } =
    req.body;

  const newGarden = await gardenModel.create({
    gardenArea,
    gardenName,
    address: gardenAddress,
    owner,
    farmer: selectedFarmers,
  });
  res.end();
};

exports.getAllGarden = async (req, res, next) => {
  const gardens = await gardenModel
    .find({})
    .populate('farmer')
    .populate('owner');
  res.send(JSON.stringify(gardens));
  res.end();
};

exports.deleteGareden = async (req, res, next) => {
  const _id = req.params.id;

  await gardenModel.deleteOne({ _id: _id });

  // garedenToDel
  res.end();
};

exports.editGarden = async (req, res, next) => {
  const _id = req.params.id;
  const garden = req.body;
  await gardenModel.updateOne(
    { _id },
    {
      gardenArea: garden.gardenArea,
      gardenName: garden.gardenName,
      address: garden.gardenAddress,
      owner: garden.owner,
      farmer: garden.mappedFarmer,
    }
  );
  res.end();
};
