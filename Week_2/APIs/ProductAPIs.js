import exp from "express";
export const productApp = exp.Router();

let products = [];

//get all products
productApp.get("/products", (req, res) => {
  //read all products & send request
  res.json({ message: "all products", payload: products });
});

//get product by id
productApp.get("/products/:id", (req, res) => {
  //get id of product from url parameter
  let idOfUrl = Number(req.params.id);
  //find product
  let product = products.find((productObj) => productObj.id === idOfUrl);
  //if product not found
  if (product === undefined) {
    return res.json({ message: "product not found" });
  }
  //send product
  res.json({ message: "product found", payload: product });
});

//Route to handle POST req of Client. Create product
productApp.post("/products", (req, res) => {
  //get product from client
  const newProduct = req.body;
  //push product into products
  products.push(newProduct);
  //send res
  res.json({ message: "product created" });
});

//Route to handle PUT req of Client. Modify the product
productApp.put("/products", (req, res) => {
  //get modified product from client
  let modifiedProduct = req.body;
  //get index of existing product in products array
  let index = products.findIndex(
    (productObj) => productObj.id === modifiedProduct.id,
  );
  //if product not found
  if (index === -1) {
    return res.json({ message: "product not found" });
  }
  //update product with index
  products.splice(index, 1, modifiedProduct);
  //send response
  res.json({ message: "product updated" });
});

//Route to handle DELETE req of Client. To delete the product
productApp.delete("/products/:id", (req, res) => {
  //get id of product from url parameter
  let idOfUrl = Number(req.params.id);
  //find index of product
  let index = products.findIndex((productObj) => productObj.id === idOfUrl);
  //if product not found
  if (index === -1) {
    return res.json({ message: "product not found to delete" });
  }
  //delete product from index
  products.splice(index, 1);
  //send res
  res.json({ message: "product removed" });
});
