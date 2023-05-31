const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GardenSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  action: [{ type: Schema.Types.ObjectId, ref: 'Action' }],
  gardenArea: [
    {
      area: Schema.Types.String,
      // gardenType: { type: Schema.Types.ObjectId, ref: 'GardenType' },
      gardenType: Schema.Types.String,
    },
  ],
  address: Schema.Types.String,

  gardenName: Schema.Types.String,
});

module.exports = mongoose.model('Garden', GardenSchema);
