import React from 'react';

const CartItem = ({ item, onIncreaseQuantity, onDecreaseQuantity, onRemoveItem }) => {
    return (
        <div className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Price: ₹{item.price.toFixed(2)}</p>
                <div className="cart-item-controls">
                    <button onClick={() => onDecreaseQuantity(item.id)} disabled={item.quantity <= 1}>
                        -
                    </button> 
                    <span>{item.quantity}</span> 
                    <button onClick={() => onIncreaseQuantity(item.id)} disabled={item.quantity >= item.stock}>
                        + 
                    </button> 
                    <button onClick={() => onRemoveItem(item.id)} className="remove-item-button">
                        Remove
                    </button>
                </div>  
                <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p> 
            </div>
        </div>
    );
};

export default CartItem;