const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  subTotal: {
    type: String,
    required: true,
  },
});


mongoose.model('Order', orderSchema);


module.exports = mongoose.model('Order');
