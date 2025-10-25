import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  qty: { type: Number, default: 1 },
  category: { type: String }, // ✅ Added for product reference
});

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  
  },
  { timestamps: true }
);

export const Cart = mongoose.model('Cart', cartSchema);
