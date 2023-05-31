const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreeSchema = new Schema({
  treeName: {
    required: true,
    type: String,
  },
  garden: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Garden',
    },
  ],
});

module.exports = mongoose.model('Tree', TreeSchema);
