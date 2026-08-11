import React, { useState } from 'react';

const CouponBox = ({ currentCoupon, onApplyCoupon, couponMessage }) => {
    const [inputCoupon, setInputCoupon] = useState(currentCoupon || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onApplyCoupon(inputCoupon);
    };

    return (
        <div className="coupon-box" style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #e9ecef', borderRadius: '8px', backgroundColor: '#fefefe' }}>
            <h4 style={{ marginBottom: '0.8rem', color: '#343a40' }}>Have a coupon?</h4>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                    type="text"
                    value={inputCoupon} 
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    style={{ flexGrow: 1, padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
                />
                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Apply
                </button>
            </form>
            {couponMessage && (
                <p style={{ marginTop: '0.5rem', color: couponMessage.includes('Successfully') ? 'green' : 'red' }}>
                    {couponMessage}
                </p>
            )}
        </div>
    );
};

export default CouponBox;