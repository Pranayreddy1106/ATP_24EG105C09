//  iv. payment.js - Payment processing
//   import { reduceStock } from './product.js';
//   import { getCartItems, getCartTotal, clearCart } from './cart.js';
//   import { applyDiscount } from './discount.js';
  
//   // TODO: Implement these functions
  
//   export function processPayment(paymentMethod, couponCode = null) {
//     // 1. Get cart items and total
//     // 2. Apply discount if coupon provided
//     // 3. Validate payment method (card/upi/cod)
//     // 4. Process payment (simulate)
//     // 5. Reduce stock for all items
//     // 6. Clear cart
//     // 7. Generate order summary
    
//     // Return order summary:
//     // {
//     //   orderId: ...,
//     //   items: [...],
//     //   subtotal: ...,
//     //   discount: ...,
//     //   total: ...,
//     //   paymentMethod: ...,
//     //   status: 'success/failed',
//     //   message: '...'
//     // }
//   }
  
//   export function validatePaymentMethod(method) {
//     // Check if method is valid (card/upi/cod)
//   }
  
//   function generateOrderId() {
//     // Generate random order ID
//     return 'ORD' + Date.now();
//   }


import { products } from './product.js';
import { getCartItems, getCartTotal, clearCart } from './cart.js';
import { applyDiscount } from './discount.js';

export function processPayment(method, couponCode = null) {

  let items = getCartItems();

  let subtotal = getCartTotal();

  let discountData = couponCode
    ? applyDiscount(subtotal, couponCode, items)
    : { discount: 0, finalTotal: subtotal };

  if (!validatePaymentMethod(method)) {
    return {
      status: "failed",
      message: "Invalid payment method"
    };
  }

  items.forEach(item => {
    let product = products.find(p => p.name === item.name);
    product.stock -= item.quantity;
  });

  clearCart();

  return {
    orderId: generateOrderId(),
    items,
    subtotal,
    discount: discountData.discount,
    total: discountData.finalTotal,
    paymentMethod: method,
    status: "success",
    message: "Order placed successfully"
  };
}

export function validatePaymentMethod(method) {
  return ["card", "upi", "cod"].includes(method);
}

function generateOrderId() {
  return 'ORD' + Date.now();
}