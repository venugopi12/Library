const mongoose = require('mongoose');

const circulationSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Book',
    required: true
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Member',
    required: true
  },
  eventType: {
    type: String,
    enum:['checkout','return'],
    required: true
  },
  checkoutDate: {
    type: Date,
    required: true
  },

  returnDate : Date
});

const Circulation = mongoose.model('circulation',circulationSchema);

module.exports = Circulation;