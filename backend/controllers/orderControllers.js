import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    if (!orders.length)
      return res.status(404).json({ message: 'No orders found for this user' });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { deliverToUser, shippingAddress, paymentMethod } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );

    const order = new Order({
      userId: req.user._id,
      orderItems: cart.items.map(item => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.qty,
        category: item.category, // ✅ Added category
      })),
      deliverToUser,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order: createdOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getOrders, createOrder };
