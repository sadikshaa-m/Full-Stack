import mongoose from "mongoose";

export const categories = ["food", "clothes", "tech", "jewellery"];
export const brands = ["addidas", "samsung", "tanishq", "kfc", "iphone"]
//schema define garni 
//custom value set garna square bracket use garni ho
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true

  },
  //enum ma fixed set of values huncha for eg: gender yo brand ma aba enum bhitra ko value dina parni huncha
  category: {
    type: String,
    required: true,
    enum: categories
  },
  brand: {
    type: String,
    required: true,
    enum: brands
  },
  stock:{
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
  },
  // eggs: {
  //   type: Number,
  //   min: [6, 'Too few eggs'],         min value 6 hunu parcha ra max chai 12 .. 6 pugena bhane MongoDB(through MOngoose) le error message 'too few eggs' bhanera pathaucha more than 12 pathayo bhane pani error msz aucha
  //   max: 12
  // },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });
//timestamps true le database ma data add gareko time pani aaucha


//model banauni => model bata methid haru paucha - add, create, update,delete etc
const Product = mongoose.model('Product', productSchema);

export default Product;