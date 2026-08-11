import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from '../components/CartItem'; // Import the new CartItem component
import CouponBox from '../components/CouponBox'; // Import the new CouponBox component
import { CartContext } from '../App';
import { calculateSubtotal, calculateDiscount, calculateGST, calculatePlatformTax, calculateGrandTotal } from '../cartCalculations';

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);

  const applyCoupon = (code) => {
    const validCoupons = ['SAVE10', 'SAVE20', 'WELCOME50'];
    const normalizedCode = code.toUpperCase();

    if (validCoupons.includes(normalizedCode)) {
      setCouponCode(normalizedCode);
      setCouponMessage('Coupon Applied Successfully!');
    } else {
      setCouponCode('');
      setCouponMessage('Invalid Coupon');
    }
  };

  const subtotal = calculateSubtotal(cart);
  const discount = calculateDiscount(subtotal, couponCode);
  const afterDiscount = subtotal - discount;
  const gst = afterDiscount * 0.18;
  const platformTax = afterDiscount * 0.02;
  const grandTotal = afterDiscount + gst + platformTax;

  const handleProceedToCheckout = () => {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    navigate('/thankyou', { state: { orderId, grandTotal } });
  };

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
              <CartItem
                key={item.id}
                item={item}
                onIncreaseQuantity={increaseQuantity}
                onDecreaseQuantity={decreaseQuantity}
                onRemoveItem={removeFromCart}
              />
            ))}
          </div>

          <CouponBox currentCoupon={couponCode} onApplyCoupon={applyCoupon} couponMessage={couponMessage} />

          <div className="cart-summary"> 
            <h2>Order Summary</h2> 
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p> 
            {discount > 0 && <p style={{ color: 'green' }}>Discount: -₹{discount.toFixed(2)}</p>}
            <p>GST (18%): ₹{gst.toFixed(2)}</p>
            <p>Platform Tax (2%): ₹{platformTax.toFixed(2)}</p>
            <p className="cart-total">Grand Total: ₹{grandTotal.toFixed(2)}</p>
            <button className="checkout-button" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;