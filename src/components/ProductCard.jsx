import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ id, title, image, category, price, rating, stock, description, onAddToCart }) {

  const handleAddToCart = () => {
    onAddToCart({ id, title, image, price, stock });
  };

  return (
    <div className="card">
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <h3>{title}</h3>
      <h4>₹{price.toFixed(2)}</h4>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;