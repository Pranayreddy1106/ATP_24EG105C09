import Product from "./Components/Product"

function App() {

  const products = [
    {
      id: 1,
      title: "Fjallraven Backpack",
      price: 109.95,
      category: "men's clothing",
      image: "https://tiimg.tistatic.com/fp/1/008/185/full-sleeves-washable-regular-fit-winter-wear-mens-cotton-jacket--869.jpg"
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      category: "men's clothing",
      image: "https://tiimg.tistatic.com/fp/1/008/185/full-sleeves-washable-regular-fit-winter-wear-mens-cotton-jacket--869.jpg"
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      category: "men's clothing",
      image: "https://tiimg.tistatic.com/fp/1/008/185/full-sleeves-washable-regular-fit-winter-wear-mens-cotton-jacket--869.jpg"
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      category: "men's clothing",
      image: "https://tiimg.tistatic.com/fp/1/008/185/full-sleeves-washable-regular-fit-winter-wear-mens-cotton-jacket--869.jpg"
    },
    {
      id: 5,
      title: "Dragon Station Bracelet",
      price: 695,
      category: "jewelery",
      image: "https://tiimg.tistatic.com/fp/1/008/185/full-sleeves-washable-regular-fit-winter-wear-mens-cotton-jacket--869.jpg"
    },
    {
      id: 6,
      title: "Solid Gold Micropave",
      price: 168,
      category: "jewelery",
      image: "https://tiimg.tistatic.com/fp/1/008/185/full-sleeves-washable-regular-fit-winter-wear-mens-cotton-jacket--869.jpg"
    }
  ]

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Product Store
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {products.map(product => (
          <Product
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}

export default App