const GST_RATE = 0.18;
const PLATFORM_TAX_RATE = 0.02;

export function calculateSubtotal(cartItems) {
    if (!Array.isArray(cartItems)) {
        return 0;
    }
    return cartItems.reduce((total, item) => {
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity, 10);
        if (isNaN(price) || isNaN(quantity)) {
            return total;
        }
        return total + (price * quantity);
    }, 0);
}

export function calculateDiscount(subtotal, couponCode) {
    let discount = 0;
    const normalizedCoupon = couponCode ? couponCode.toUpperCase() : ''; 

    switch (normalizedCoupon) {
        case 'SAVE10':
            discount = subtotal * 0.10;
            break;
        case 'SAVE20':
            discount = subtotal * 0.20;
            break;
        case 'WELCOME50':
            discount = 50;
            break;
        default:
            discount = 0;
            break;
    }
    return Math.min(discount, subtotal);
}

export function calculateGST(amount) {
    return amount * GST_RATE;
}

export function calculatePlatformTax(amount) {
    return amount * PLATFORM_TAX_RATE;
}

export function calculateGrandTotal(subtotal, discount, gst, platformTax) {
    return subtotal - discount + gst + platformTax;
}