import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../App';

/**
 * Thank You page displayed after a successful checkout.
 * Clears the cart on mount and shows a confirmation message.
 */
function ThankYou() {
    const { clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [orderId] = useState(() => Math.random().toString(36).substring(2, 10).toUpperCase());

    useEffect(() => {
        // Clear the cart when this page loads
        if (clearCart) {
            clearCart();
        }
    }, [clearCart]);

    const handleShopMore = () => {
        navigate('/products');
    };

    return (
        <div className="thankyou-page">
            <div className="thankyou-icon">✅</div>
            <h1>Thank You for Shopping!</h1>
            <p className="thankyou-message">
                Your order has been placed successfully. We appreciate your business!
            </p>
            <p className="thankyou-order-id">
                Order ID: <strong>#{orderId}</strong>
            </p>
            <button onClick={handleShopMore} className="shop-more-button">
                Shop More
            </button>
        </div>
    );
}

export default ThankYou;
