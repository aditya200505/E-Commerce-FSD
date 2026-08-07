import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart"; // Import the new Cart component

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productToAdd.id);
      if (existingItem) {
        // If item already exists, increase its quantity
        return prevCart.map((item) =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If item is new, add it with quantity 1
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } // Don't go below 1
          : item
      ).filter(item => item.quantity > 0) // Remove item if quantity becomes 0 (though we prevent it from going below 1)
    );
  };

  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Calculate total value of items in the cart
  const getTotalCartValue = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };
  
  // Ensure the total value is a number before returning
  // const getTotalCartValue = () => {
  //   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  //   return total.toFixed(2);
  // };

  // If you want to return a number for calculations later, you can parse it:
  // const getTotalCartValue = () => {
  //   return parseFloat(cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2));
  // };

  // Calculate total number of items in the cart
  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, getTotalCartValue, getTotalCartItems, increaseQuantity, decreaseQuantity, removeItem }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/details" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;