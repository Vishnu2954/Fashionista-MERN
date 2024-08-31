import React, { useContext, useState, useEffect } from 'react';  
import { ItemContext, imageMap } from '../context/ItemContext';  
import { FaHeart, FaShoppingCart, FaTrash, FaMinus, FaPlus } from "react-icons/fa";  
import './Cart.css';  
import axios from 'axios';  

const Cart = () => {  
  const { itemsInCart, removeFromCart } = useContext(ItemContext);  
  const [quantities, setQuantities] = useState({});  
  const [deliveryDetails, setDeliveryDetails] = useState({  
    name: '',  
    address: '',  
    city: '',  
    postalCode: '',  
    phone: ''  
  });  
  const [orderStatus, setOrderStatus] = useState('');  

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
    if (itemsInCart.length === 0) {  
      setOrderStatus('Your cart is empty!');  
      return;  
    }  
    const cartItems = itemsInCart.map((item) => ({  
      name: item.name,  
      size: item.size,  
      quantity: quantities[`${item._id}-${item.size}`],  
      price: item.price * (quantities[`${item._id}-${item.size}`]),  
      ...deliveryDetails  
    }));  
    
    console.log("Cart Items:", cartItems);  
    try {  
      const response = await axios.post('https://fashionista-uo86.onrender.com/order', { cartItems });  
      setOrderStatus('Order placed successfully!');  
      console.log(response.data);  
    } catch (error) {  
      setOrderStatus('Error saving order. Please try again later.');  
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
    <div className="cart-container">  
      <div className="cart-header">  
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '75px' }}>  
          <h2>My Cart</h2>  
          <div style={{ fontSize: '25px', color: 'rgb(211, 10, 121)' }}><FaShoppingCart /></div>  
        </div>  
        {orderStatus && <p className="order-status">{orderStatus}</p>}  
      </div>  
      {itemsInCart.length === 0 ? (  
        <p className="empty-cart-message">Your Cart is currently empty.</p>  
      ) : (  
        <div className="cart-content">  
          <div className="cart-items">  
            {itemsInCart.map((item) => (  
              <div key={`${item._id}-${item.size}`} className="cart-item">  
                <img src={imageMap[item.image]} alt={item.name} className="cart-item-image" />  
                <div className="cart-item-details">  
                  <h3>{item.name}</h3>  
                  <p className="cart-item-price">{item.price} Rs</p>  
                  <p className="cart-item-size">Size: {item.size}</p>  
                  <div className="quantity-controls">  
                    <button onClick={() => updateQuantity(item, -1)} disabled={quantities[`${item._id}-${item.size}`] <= 1}>  
                      <FaMinus />  
                    </button>  
                    <span>{quantities[`${item._id}-${item.size}`] || 1}</span>  
                    <button onClick={() => updateQuantity(item, 1)}>  
                      <FaPlus />  
                    </button>  
                  </div>  
                </div>  
                <button className="remove-button" onClick={() => removeFromCart(item)}>  
                  <FaTrash />  
                </button>  
              </div>  
            ))}  
          </div>  
          <div className="cart-summary">  
            <h3>Order Summary</h3>  
            <p>Total Items: {calculateTotalItems()}</p>  
            <p className="total-price">Total Price: Rs.{calculateTotalPrice()}</p>  
            <form onSubmit={handleCheckout} className="delivery-form">  
              <h4>Delivery Details</h4>  
              <input  
                type="text"  
                name="name"  
                placeholder="Full Name"  
                value={deliveryDetails.name}  
                onChange={handleChange}  
                required  
              />  
              <input  
                type="text"  
                name="address"  
                placeholder="Address"  
                value={deliveryDetails.address}  
                onChange={handleChange}  
                required  
              />  
              <input  
                type="text"  
                name="city"  
                placeholder="City"  
                value={deliveryDetails.city}  
                onChange={handleChange}  
                required  
              />  
              <input  
                type="text"  
                name="postalCode"  
                placeholder="Postal Code"  
                value={deliveryDetails.postalCode}  
                onChange={handleChange}  
                required  
              />  
              <input  
                type="tel"  
                name="phone"  
                placeholder="Phone Number"  
                value={deliveryDetails.phone}  
                onChange={handleChange}  
                required  
              />  
              <button type="submit" className="checkout-button">Proceed to Checkout</button>  
            </form>  
          </div>  
        </div>  
      )}  
    </div>  
  );  
};  

export default Cart;
