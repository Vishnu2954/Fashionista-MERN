const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const querySchema = new mongoose.Schema({
    email: String,
    concern: String,
    createdAt: { type: Date, default: Date.now }
});

const deliverySchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    postalCode: String,
    phone: String
}, { _id: false });

const cartSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    },
    deliveryDetails: deliverySchema,
    createdAt: { type: Date, default: Date.now }
});

const clothesSchema = new mongoose.Schema({
    name: String,
    price: Number,
    type: String,
    image: String 
  });

const QueryModel = mongoose.model("querydata", querySchema)
const CartModel = mongoose.model("orderdata",cartSchema)
const ProductModel = mongoose.model("clothes",clothesSchema)
const Model = mongoose.model("userdata",Schema)

module.exports = { Model, QueryModel, CartModel, ProductModel };