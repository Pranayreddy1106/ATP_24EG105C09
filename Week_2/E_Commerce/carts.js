import { getProductById, checkStock } from './product.js';

let cartItems = [];

export function addToCart(productId, quantity) {
  // 1. Get product details
  let product = getProductById(productId);
  if (!product) {
    return "Product not found";
  }
  // 2. Check stock availability
  if (!checkStock(productId, quantity)) {
    return "Not enough stock";
  }

  // 3. Check if product already exists in cart
  //- If yes, update quantity
//- If no, add new item
  let item = cartItems.find(i => i.productId === productId);
  if (item) {
    item.quantity += quantity;
  } else {
    cartItems.push({
      productId,
      quantity
    });
  }
  return "Item added to cart";
}

export function removeFromCart(productId) {
    // Remove product from cart
  let item = cartItems.find( i => i.productId === productId);
  if (!item) {
    return "Item not found in cart";
  }
  cartItems.splice(cartItems.indexOf(item), 1);
  return "Item removed from cart";
}

export function updateQuantity(productId, newQuantity) {
// Update quantity of product in cart
// Check stock before updating
  if (!checkStock(productId, newQuantity)) {
    return "Not enough stock";
  }
  let item = cartItems.find(i => i.productId === productId);
  if (!item) {
    return "Item not in cart";
  }
  item.quantity = newQuantity;
  return "Quantity updated";
}

export function getCartItems() {
    // Return all cart items with product details
  return cartItems.map(item => {
    let product = getProductById(item.productId);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      total: product.price * item.quantity
    };
  });
}

export function getCartTotal() {
    // Calculate total price of all items in cart
// Return total
  let total = 0; 
  total = cartItems.reduce((total, item) => {
    let product = getProductById(item.productId);
    return total + (product.price * item.quantity);
  }, 0);
  return total;
}
export function clearCart() {
  cartItems = [];
}