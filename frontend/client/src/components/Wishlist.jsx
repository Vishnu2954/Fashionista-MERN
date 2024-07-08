import React, { useContext } from 'react';
import { ItemContext, imageMap } from '../context/ItemContext';
import { FaHeart } from "react-icons/fa";
import './Wishlist.css';

const Wishlist = () => {
  const { itemsInWishlist, removeFromWishlist, addToCart, imageMap } = useContext(ItemContext);

  const handleRemoveFromWishlist = (itemToRemove) => {
    removeFromWishlist(itemToRemove);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className="wishlist-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '100px'}}>
        <h2>My Wishlist</h2>
        <div style={{ fontSize: '25px', color: 'rgb(211, 10, 121)' }}><FaHeart /></div>
      </div>
      {itemsInWishlist.length === 0 ? (
        <p>Your wishlist is currently empty.</p>
      ) : (
        <div className="wishlist-items">
          {itemsInWishlist.map((item) => (
            <div key={`${item._id}-${item.size}`} className="wishlist-item">
              <img src={imageMap[item.image]} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>{item.price} Rs</p>
                <p>Size: {item.size}</p>
                <button onClick={() => handleRemoveFromWishlist(item)}>Remove</button>
                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
