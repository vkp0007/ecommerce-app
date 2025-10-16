import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId });
        return res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const addToCart = async (req, res) => {
    const { productId, qty } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
        existingItem.qty += qty;
    }
    else
        cart.items.push({
            productId,
            name: product.name,
            image: product.image,
            price: product.price,
            qty,
        });

    await cart.save();
    return res.json(cart);
};

const updateCartItem = async (req, res) => {

    const { qty } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });
    console.log(cart)
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.productId.toString() === req.params.productId);

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    item.qty = qty;
    await cart.save();
    return res.json(cart);
}

const removeFromCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
    await cart.save();
    return res.json(cart);
}


export { getCart, addToCart, updateCartItem, removeFromCart };