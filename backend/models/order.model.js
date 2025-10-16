import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
});

const shippingAddressSchema = new mongoose.Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderItems: [orderItemSchema],
        deliverToUser: { type: String, required: true },
        shippingAddress: shippingAddressSchema,
        paymentMethod: { type: String, required: true },
        orderStatus: {
            type: String,
            enum: ['ordered', 'shipped', 'delivered'],
            default: 'ordered',
        },
        totalPrice: { type: Number, required: true },
    },
    { timestamps: true }
);

export const Order =mongoose.model('Order',orderSchema)
