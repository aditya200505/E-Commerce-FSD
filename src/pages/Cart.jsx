import React, { useContext } from "react";
import { CartContext } from "../App";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, getTotalCartValue, increaseQuantity, decreaseQuantity, removeItem } = useContext(CartContext);

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/products" className="continue-shopping-button">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price.toFixed(2)}</p>
                  <div className="cart-item-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <button onClick={() => removeItem(item.id)} className="remove-item-button">Remove</button>
                  </div>
                  <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <p>Total Items: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
            <p className="cart-total">Total Value: ₹{getTotalCartValue()}</p>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;