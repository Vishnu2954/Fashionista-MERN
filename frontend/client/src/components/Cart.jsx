import React, { useContext, useState, useEffect } from 'react';
import { ItemContext, imageMap } from '../context/ItemContext';
import { FaShoppingCart } from "react-icons/fa";
import './Cart.css';
import axios from 'axios';

const Cart = () => {
  const { itemsInCart, removeFromCart, imageMap } = useContext(ItemContext);
  const [quantities, setQuantities] = useState({});
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  useEffect(() => {
    const initialQuantities = itemsInCart.reduce((acc, item) => {
      const key = `${item._id}-${item.size}`;
      acc[key] = 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [itemsInCart]);

  const updateQuantity = (item, value) => {
    const key = `${item._id}-${item.size}`;
    setQuantities(prevQuantities => {
      const newQuantity = (prevQuantities[key] || 1) + value;
      if (newQuantity < 1) return prevQuantities;
      return {
        ...prevQuantities,
        [key]: newQuantity
      };
    });
  };

  const calculateTotalItems = () => {
    return itemsInCart.reduce((total, item) => {
      const key = `${item._id}-${item.size}`;
      return total + (quantities[key] || 1);
    }, 0);
  };

  const calculateTotalPrice = () => {
    return itemsInCart.reduce((total, item) => {
      const key = `${item._id}-${item.size}`;
      return total + (item.price * (quantities[key] || 1));
    }, 0);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const cartItems = itemsInCart.map((item) => ({
      name: item.name,
      size: item.size,
      quantity: quantities[`${item._id}-${item.size}`],
      price: item.price * (quantities[`${item._id}-${item.size}`])
    }));

    const orderDetails = {
      cartItems,
      deliveryDetails
    };
    console.log("Order Details:", orderDetails);

    try {
      const response = await axios.post('http://localhost:4000/order', orderDetails);
      console.log(response.data); 
    } catch (error) {
      console.error('Error saving order:', error); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  return (
    <div className="mycart-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '75px'}}>
        <h2>My Cart</h2>
        <div style={{ fontSize: '25px', color: 'rgb(211, 10, 121)' }}><FaShoppingCart /></div>
      </div>
      {itemsInCart.length === 0 ? (
        <p>Your Cart is currently empty.</p>
      ) : (
        <div className="mycart-content">
          <div className="mycart-items">
            {itemsInCart.map((item) => (
              <div key={`${item._id}-${item.size}`} className="mycart-item">
                <img src={imageMap[item.image]} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.price} Rs</p>
                  <p>Size: {item.size}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item, -1)} disabled={quantities[`${item._id}-${item.size}`] <= 1}>-</button>
                    <span>{quantities[`${item._id}-${item.size}`] || 1}</span>
                    <button onClick={() => updateQuantity(item, 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item)}>Remove from Cart</button>
                  </div>
                </div>
            ))}
          </div>
          <br />
          <hr />
          <br />
          <div className="summary">
          <b>Summary</b>
            <p>Total Items: {calculateTotalItems()}</p>
            <b>Total Price: Rs.{calculateTotalPrice()} </b>
            <br /><br />
            <b>Delivery Details</b><br /><br />
            <div className="delivery-details-form">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={deliveryDetails.name}
                onChange={handleChange}
              /><br /><br />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={deliveryDetails.address}
                onChange={handleChange}
              /><br /><br />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={deliveryDetails.city}
                onChange={handleChange}
              /><br /><br />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={deliveryDetails.postalCode}
                onChange={handleChange}
              /><br /><br />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={deliveryDetails.phone}
                onChange={handleChange}
              />
            </div>
            <br /><br />
            <button onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
