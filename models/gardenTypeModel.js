const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GardenTypeSchema = new Schema({
  gardenType: String,
  garden: [{ type: Schema.Types.ObjectId, ref: 'Garden' }],
});

module.exports = mongoose.model('GardenType', GardenTypeSchema);
