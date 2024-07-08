const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { Model, CartModel, QueryModel, ProductModel } = require('./models/fashionista')

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://ecommerce:1234@cluster0.zwe4hbb.mongodb.net/Fashionista");

app.post('/login', async (req, res) => {
    const {email,password}=req.body;
    Model.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json("Success")
            }
            else res.json("Incorrect Password")
        }
        else res.json("No users found. Please signup")
    })
  });

app.post('/signup', async (req, res) => {
        Model.create(req.body)
        .then(userdata=>res.json(userdata))
        .catch(err=>res.json(err))
  });

app.post('/query', async (req, res) => {
    const { email, concern } = req.body; 
    QueryModel.create({ email, concern }) 
        .then(querydata => res.json(querydata))
        .catch(err => res.status(500).json({ error: "Error saving query" }));
});

app.post('/order', async (req, res) => {
  const { cartItems, deliveryDetails } = req.body;
  CartModel.create({ cartItems, deliveryDetails }) 
        .then(checkoutdata => res.json(checkoutdata))
        .catch(err => res.status(500).json({ error: "Error saving query" }));
});

  
  app.get('/products', async (req, res) => {
    try {
      const products = await ProductModel.find(); 
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

app.listen(port, (error) => {
    if (!error) console.log("Server Running");
    else console.log(error);
  });