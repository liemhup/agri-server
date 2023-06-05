const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreeSchema = new Schema({
  tenCay: {
    required: true,
    type: String,
  },
  garden: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Garden',
    },
  ],
  giaiDoan: [
    {
      tenGiaiDoan: String,
      tuoi: String,
      mota: String,
      benh: [{ tenbenh: String, cachChua: String, cachPhong: String }],
      phanbon: String,
    },
  ],
});

module.exports = mongoose.model('Tree', TreeSchema);
