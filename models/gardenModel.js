const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GardenSchema = new Schema({
  farmer: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  action: [{ type: Schema.Types.ObjectId, ref: 'Action' }],
  gardenArea: [
    {
      area: Schema.Types.String,
      gardenType: Schema.Types.String,
      trees: [{ type: ObjectId, ref: 'Tree' }],
    },
  ],
  address: Schema.Types.String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  gardenName: Schema.Types.String,
});

module.exports = mongoose.model('Garden', GardenSchema);
