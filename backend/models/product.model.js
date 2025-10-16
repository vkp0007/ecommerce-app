import mongoose from 'mongoose'
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        required: [true, 'Count in stock is required'],
        default: 0,
    },
    image: {
        type: String,
        required: true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema)