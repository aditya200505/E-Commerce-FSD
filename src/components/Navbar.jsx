import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../App"; // Import CartContext

function Navbar(){
  const { getTotalCartItems, getTotalCartValue } = useContext(CartContext);

  return (
    <nav>
      <h2>ShopEasy</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <div className="cart-info">
          {/* Placeholder link for a future cart page */}
          <Link to="/cart">
            Cart ({getTotalCartItems()})
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;