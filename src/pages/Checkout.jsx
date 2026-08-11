import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const ThankYou = () => {
    const location = useLocation();
    const { orderId, grandTotal } = location.state || {};

    useEffect(() => {
        if (!orderId) {
            console.warn("No order ID found in location state. Redirecting to home.");
        }
    }, [orderId]);

    return (
        <div className="thankyou-page">
            <div className="thankyou-icon">🎉</div>
            <h1>Thank You for Your Order!</h1>
            <p className="thankyou-message">Your order has been placed successfully.</p>
            {orderId && <p className="thankyou-order-id">Order ID: <strong>{orderId}</strong></p>}
            {grandTotal && <p className="thankyou-order-id">Total Paid: <strong>₹{grandTotal.toFixed(2)}</strong></p>}
            <Link to="/products" className="shop-more-button">Continue Shopping</Link>
        </div>
    );
};

export default ThankYou;