import { Product } from '../models/product.model.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, countInStock, category } = req.body;

    if (!name || !price || !description || !countInStock || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let uploadedImageUrl = '';
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'ecommerce_products',
      });
      uploadedImageUrl = uploadResult.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const product = await Product.create({
      name,
      price,
      description,
      countInStock,
      category,
      image: uploadedImageUrl,
      user: req.user._id,
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, countInStock, category } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'ecommerce_products',
      });
      product.image = uploadResult.secure_url;
      fs.unlinkSync(req.file.path);
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.countInStock = countInStock || product.countInStock;
    product.category = category || product.category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getProducts, createProduct, getProductById, updateProduct, deleteProduct };
