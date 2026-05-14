import React from 'react'

function Product({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 mx-auto object-contain"/>
      <h2 className="font-bold mt-4 text-lg">
        {product.title}
      </h2>
      <p className="text-gray-500">
        Category: {product.category}
      </p>
      <p className="text-green-600 font-semibold">
        ${product.price}
      </p>
    </div>
  )
}

export default Product