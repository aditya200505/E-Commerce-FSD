import React, { useContext } from "react";
import { CartContext } from "../App"; // Import CartContext

function ProductCard({ product }) { // Destructure product prop
  const { addToCart } = useContext(CartContext);
  const { id, name, price, image } = product; // Destructure product details

  const handleAddToCart = () => {
    addToCart(product); // Pass the entire product object to addToCart
  };

  return (
    <div className="card">
      <img src={image} alt={name} /> {/* Add alt attribute for accessibility */}
      <h3>{name}</h3>
      <h4>₹{price.toFixed(2)}</h4> {/* Format price to 2 decimal places */}
      <button onClick={handleAddToCart}>Add to Cart</button> {/* Change button text and add onClick */}
    </div>
  );
}

export default ProductCard;