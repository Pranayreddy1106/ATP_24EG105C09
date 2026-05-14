//Create mini-express application(Seperate route)
import exp from "express";
import { ProductModel } from "../models/ProductModel.js";
import { verifyToken } from "../middlewares/verifytoken.js";
export const productApp = exp.Router();

//Define userRST API ROUTES
// Create new Product
productApp.post("/products",verifyToken, async (req, res) => {
  //get new user obj from req
  const newProduct = req.body;
  //create new user document
  const newProductDocument = new ProductModel(newProduct);
  //save user document
  const result = await newProductDocument.save();
  console.log(result);
  // send res
  res
    .status(201)
    .json({ message: "Product created successfully", payload: result });
});

//Read all users
productApp.get("/products", async (req, res) => {
  let productList = await ProductModel.find();
  res.json(productList);
});
//Read users by ID
productApp.get("/products/:id", async (req, res) => {
  //Read object id from req
  const uid = req.params.id;
  //find user by id
  const productObj = await ProductModel.findById(uid); //use find one method to read a documeent with non object fileds and use findById
  //if user not found
  if(!productObj){
     res.status(404)
    .json({message:"product not found"})
  }else{
      //send res
      res.status(200).json({ message: "products", payload: productObj });
  }
});
//Update User by id
productApp.put("/products/:id", async (req, res) => {
  //get modified user from req
  const modifiedProduct = req.body;
  const uid = req.params.id;
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    uid,
    { $set: { ...modifiedProduct } },
    { new: true, runValidators:true},
  );
  res
    .status(200)
    .json({ message: "prdocut updated successfully", payload: updatedProduct });
});

// Delete User by id
productApp.delete("/products/:id", async (req, res) => {
  const uid = req.params.id;
  const deletedProduct = await ProductModel.findByIdAndDelete(uid);
  if(!deletedProduct){
    return res.status(404)
    .json({message:"product not found"})
  }else{
  res
    .status(200)
    .json({ message: "product deleted successfully", payload: deletedProduct });
  }
}
)