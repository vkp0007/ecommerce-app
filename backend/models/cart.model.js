import mongoose from 'mongoose';
const { Schema } = mongoose;
const cartItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    name: String,
    image: String,
    price: Number,
    qty: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    items: [cartItemSchema],
});

export const Cart = mongoose.model('Cart', cartSchema);