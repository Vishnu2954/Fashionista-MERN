import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import productImage1 from '../assets/product_1.png';
import productImage2 from '../assets/product_2.png';
import productImage3 from '../assets/product_3.png';
import productImage4 from '../assets/product_4.png';
import productImage5 from '../assets/product_5.png';
import productImage6 from '../assets/product_6.png';
import productImage7 from '../assets/product_7.png';
import productImage8 from '../assets/product_8.png';
import productImage9 from '../assets/product_9.png';
import productImage10 from '../assets/product_10.png';
import productImage11 from '../assets/product_11.png';
import productImage12 from '../assets/product_12.png';
import productImage13 from '../assets/product_13.png';
import productImage14 from '../assets/product_14.png';
import productImage15 from '../assets/product_15.png';
import productImage16 from '../assets/product_16.png';
import productImage17 from '../assets/product_17.png';
import productImage18 from '../assets/product_18.png';
import productImage19 from '../assets/product_19.png';
import productImage20 from '../assets/product_20.png';
import productImage21 from '../assets/product_21.png';
import productImage22 from '../assets/product_22.png';
import productImage23 from '../assets/product_23.png';
import productImage24 from '../assets/product_24.png';
import productImage25 from '../assets/product_25.png';
import productImage26 from '../assets/product_26.png';
import productImage27 from '../assets/product_27.png';
import productImage28 from '../assets/product_28.png';
import productImage29 from '../assets/product_29.png';
import productImage30 from '../assets/product_30.png';
import productImage31 from '../assets/product_31.png';
import productImage32 from '../assets/product_32.png';
import productImage33 from '../assets/product_33.png';
import productImage34 from '../assets/product_34.png';
import productImage35 from '../assets/product_35.png';
import productImage36 from '../assets/product_36.png';

const imageMap = {
  'product_1.png': productImage1,
  'product_2.png': productImage2,
  'product_3.png': productImage3,
  'product_4.png': productImage4,
  'product_5.png': productImage5,
  'product_6.png': productImage6,
  'product_7.png': productImage7,
  'product_8.png': productImage8,
  'product_9.png': productImage9,
  'product_10.png': productImage10,
  'product_11.png': productImage11,
  'product_12.png': productImage12,
  'product_13.png': productImage13,
  'product_14.png': productImage14,
  'product_15.png': productImage15,
  'product_16.png': productImage16,
  'product_17.png': productImage17,
  'product_18.png': productImage18,
  'product_19.png': productImage19,
  'product_20.png': productImage20,
  'product_21.png': productImage21,
  'product_22.png': productImage22,
  'product_23.png': productImage23,
  'product_24.png': productImage24,
  'product_25.png': productImage25,
  'product_26.png': productImage26,
  'product_27.png': productImage27,
  'product_28.png': productImage28,
  'product_29.png': productImage29,
  'product_30.png': productImage30,
  'product_31.png': productImage31,
  'product_32.png': productImage32,
  'product_33.png': productImage33,
  'product_34.png': productImage34,
  'product_35.png': productImage35,
  'product_36.png': productImage36,
};

const ItemContext = createContext();

const CustomItemContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [itemsInWishlist, setItemsInWishlist] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setItemsInCart([...itemsInCart, product]);
    setTotalPrice(totalPrice + product.price);
  };

  const removeFromCart = (product) => {
    setItemsInCart(itemsInCart.filter(item => item._id !== product._id));
    setTotalPrice(totalPrice - product.price);
  };

  const addToWishlist = (product) => {
    setItemsInWishlist([...itemsInWishlist, product]);
  };

  const removeFromWishlist = (product) => {
    setItemsInWishlist(itemsInWishlist.filter(item => item._id !== product._id));
  };

  return (
    <ItemContext.Provider value={{
      products,
      itemsInCart,
      itemsInWishlist,
      totalPrice,
      addToCart,
      removeFromCart,
      addToWishlist,
      removeFromWishlist,
      imageMap 
    }}>
      {children}
    </ItemContext.Provider>
  );
};

export default CustomItemContext;
export { ItemContext, imageMap }; 
