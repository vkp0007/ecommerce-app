import express from 'express'
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

const getOrders = async (req, res) => {
  const userId = req.user._id;
  const orders = await Order.find({ userId });
  if (!orders) {
    return res.status(404).json({ message: 'No orders found for this user' })
  }
  return res.status(200).json(orders);
}

const createOrder = async (req, res) => {
  const { deliverToUser, shippingAddress, paymentMethod } = req.body;

  // Get user cart
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Your cart is empty' })
  }

  // Calculate total price
  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // Create new order
  const order = new Order({
    userId: req.user._id,
    orderItems: cart.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      qty: item.qty,
    })),
    deliverToUser,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  const createdOrder = await order.save();

  // Empty the cart after placing order
  cart.items = [];
  await cart.save();

  res.status(201).json({
    message: 'Order placed successfully',
    order: createdOrder,
  });
}
export { getOrders, createOrder }