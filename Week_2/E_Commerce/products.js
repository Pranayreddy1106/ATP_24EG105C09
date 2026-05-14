 // Product database (simulated)
const products = [
  { id: 1, name: 'Laptop', price: 50000, stock: 10, category: 'electronics' },
  { id: 2, name: 'Phone', price: 30000, stock: 15, category: 'electronics' },
  { id: 3, name: 'Headphones', price: 2000, stock: 25, category: 'accessories' },
  { id: 4, name: 'Mouse', price: 500, stock: 50, category: 'accessories' },
  { id: 5, name: 'Keyboard', price: 1500, stock: 30, category: 'accessories' }
];

// TODO: Implement these functions
                          
export function getProductById(id) {
  // Find and return product by ID
  let product = products.find(p => p.id == id)
  return product
}

export function getAllProducts() {
  // Return all products
  return products
}

export function getProductsByCategory(category) {
  // Filter products by category
  let filteredProducts = products.filter(p => p.category == category)
  return filteredProducts
}

export function searchProducts(query) {
  // Search products by name (case-insensitive)
  let targetProduct = products.find(p => p.name.toLowerCase().inlduces(query.toLowerCase()))
  // let targetProduct = products.filter(p => p.name == query)
  return targetProduct
}

export function checkStock(productId, quantity) {
  // Check if product has enough stock
  // Return true/false
  let product = products.find(p => p.id == productId)
  if(!product) return false
  return product.stock >= quantity
}

export function reduceStock(productId, quantity) {
  // Reduce product stock after purchase
  let product = products.find(p => p.id == productId)
  if(!product) return "Product not found"
  product.stock -= quantity
}


