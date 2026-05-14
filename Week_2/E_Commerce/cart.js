import { getProductById, checkStock, reduceStock } from './product.js';

let cartItems = [];

// TODO: Implement these functions

export function addToCart(productId, quantity) {
// 1. Get product details
let product = getProductById(productId)
// 2. Check stock availability
if(checkStock(productId, quantity)){
    console.log("Product is available")
}else{
    console.log("Product is not available")
}
// 3. Check if product already in cart
//- If yes, update quantity
//- If no, add new item
let isAvailableInCart = cartItems.find(item => item.id == productId)
if(isAvailableInCart){
    reduceStock(productId, quantity)
    return "Product updated in cart"
}else{
    cartItems.push(product)
    reduceStock(productId, quantity)
    return "Product added to cart"
}
// 4. Return success/error message
}

export function removeFromCart(productId) {
// Remove product from cart
let product = cartItems.find(item => item.id == productId)
cartItems.splice(cartItems.indexOf(product), 1)
return "Product removed from cart"
}

export function updateQuantity(productId, newQuantity) {
// Update quantity of product in cart
// Check stock before updating

}

export function getCartItems() {
// Return all cart items with product details

}

export function getCartTotal() {
// Calculate total price of all items in cart
// Return total
}

export function clearCart() {
// Empty the cart
}

