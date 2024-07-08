import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Products from './components/ProductList.jsx';
import './App.css';
import CustomItemContext from './context/ItemContext.jsx';  
import Navbar1 from './components/Navbar1.jsx';
import Cart from './components/Cart.jsx';
import Home from './components/Home.jsx';
import Wishlist from './components/Wishlist.jsx';
import Queries from './components/Queries.jsx';
import LoginForm from './components/LoginForm.jsx'; 
const AppContent = () => {
    const location = useLocation();
    const showNavbar = location.pathname !== '/';

    return (
        <>
            {showNavbar && <Navbar1 />}
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/queries" element={<Queries />} />
                <Route path="/" element={<LoginForm />} />
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <CustomItemContext>
            <Router>
                <AppContent />
            </Router>
        </CustomItemContext>
    );
};

export default App;
