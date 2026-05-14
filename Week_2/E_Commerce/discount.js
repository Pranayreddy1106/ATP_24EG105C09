const coupons = {
  WELCOME10: { type: 'percentage', value: 10, minAmount: 1000 },
  FLAT500: { type: 'flat', value: 500, minAmount: 5000 },
  ELECTRONICS20: { type: 'percentage', value: 20, minAmount: 10000, category: 'electronics' }
};

export function validateCoupon(code, cartTotal, cartItems) {
// 1. Check if coupon exists
// 2. Check minimum amount requirement
// 3. Check category requirement (if any)
 // Return { valid: true/false, message: '...' }
  let coupon = coupons[code];
  if (!coupon) {
    return { valid: false, message: "Invalid coupon" };
  }
  if (cartTotal < coupon.minAmount) {
    return { valid: false, message: "Minimum amount not reached" };
  }
  if (coupon.category) {
    let hasCategory = cartItems.some(item =>
      item.category === coupon.category
    );
    if (!hasCategory) {
      return { valid: false, message: "Coupon not valid for these items" };
    }
  }
  return { valid: true, message: "Coupon applied" };
}

export function calculateDiscount(code, cartTotal) {
    // Calculate discount amount based on coupon type
 // Return discount amount
  let coupon = coupons[code];
  if (coupon.type === "percentage") {
    return cartTotal * coupon.value / 100;
  }
  if (coupon.type === "flat") {
    return coupon.value;
  }
}

export function applyDiscount(cartTotal, code, cartItems) {
    // 1. Validate coupon
// 2. If valid, calculate discount
    // 3. Return final amount and discount details
  let validation = validateCoupon(code, cartTotal, cartItems);
  if (!validation.valid) {
    return {
      originalTotal: cartTotal,
      discount: 0,
      finalTotal: cartTotal,
      message: validation.message
    };
  }
  let discount = calculateDiscount(code, cartTotal);
  return {
    originalTotal: cartTotal,
    discount,
    finalTotal: cartTotal - discount,
    message: "Discount applied"
  };
}