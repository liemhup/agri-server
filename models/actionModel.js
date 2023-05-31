const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  user: {
    required: true,
    type: ObjectId,
  },
  action: {
    type: String,
    required: true,
  },
  actionDate: {
    type: Schema.Types.Date,
  },
  garden: { type: Schema.Types.ObjectId, ref: 'Garden' },
  actionType: String,
});

module.exports = mongoose.model('Action', ActionSchema);
