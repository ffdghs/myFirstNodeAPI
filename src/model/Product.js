import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
    validate: {
      validator: Number.isInteger
    }
  }
});

const Product = mongoose.model('Article', productSchema);

export default Product;


