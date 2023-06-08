const mongoose = require('mongoose');
const Order = require('../models/order');


module.exports.addOrder = async (req, res) => {
    console.log('Adding Order');
    try {
      const { userName, newOrder } = req.body;
      const { userId, subTotal, phoneNumber } = newOrder;
      
      const newOrders = new Order({
        userName,
        userId,
        phoneNumber,
        subTotal,
      });

      await newOrders.save();
    
      res.status(201).json({ message: 'Order added successfully'});
    } catch (err) {
      console.error('Error adding order:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
    };
    
    
module.exports.getOrder = async (req, res) => {
  console.log('Getting Order');
  try {
    const { userName } = req.query;

    const orders = await Order.find({userName});
    res.json(orders);
  } catch (err) {
    console.error('Error retrieving orders:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
  };
  