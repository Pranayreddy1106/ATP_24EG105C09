//Create mini-express application(Seperate route)
import exp from "express";
import { UserModel } from "../models/UserModel.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import {verifyToken} from "../middlewares/verifytoken.js";
const { sign } = jwt;
export const userApp = exp.Router();

//Define userREST API ROUTES

//user login
userApp.post("/auth",async (req, res) => {
  //get user cred obj from client
  const { email, password } = req.body;
  //verify email
  let user = await UserModel.findOne({ email: email });
  //is email not existed
  if (user === null) {
    return res.status(404).json({ message: "Invalid email" });
  }
  //compare password
  const result = await compare(password, user.password);
  //if passwords are not matched
  if (result === false) {
    return res.status(400).json({ message: "Invalid password" });
  }
  //if passwrods are matched
  //create token(jsonwebtoken  -- jwt -- jot)
  const signedToken = sign({ email: user.email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  //store token as http only coockie
  res.cookie("token", signedToken,{
    httpOnly:true, // if we dont give this option then it will not make this as http coockie only
    sameSite:"lax",
    secure:false //"strict" can send coockies only when the client and sever run in the same domain
  })  // this send coockie as a http only request

  res.status(200).json({message:"login success", payload:user})
});

// Create new User
userApp.post("/users",async (req, res) => {
  //get new user obj from req
  const newUser = req.body;
  //hash the password
  const hashedPassword = await hash(newUser.password, 10);
  //replace plain password with the hashed password
  newUser.password = hashedPassword;
  //create new user document
  const newUserDocument = new UserModel(newUser);
  //save user document
  const result = await newUserDocument.save();
  console.log(result);
  // send res
  res
    .status(201)
    .json({ message: "user created successfully", payload: result });
});

//Read all users (protected route)
userApp.get("/users",verifyToken, async (req, res) => {
  //get user details 
  let userObj = req.user;
  
  let usersList = await UserModel.find();
  res.json(usersList);
});

//Read users by ID
userApp.get("/user",verifyToken, async (req, res) => {
  //read user email from request 
  const emailofUser = req.user?.email;
  // print the user email to the terminal
  console.log(emailofUser);
  
  //Read object id from req
  const uid = req.params.id;
  //find user by email
  const userObj = await UserModel.findOne({email:emailofUser}).populate("cart.product"); //use find one method to read a documeent with non object fileds and use findById. The populate method is an aggregation pipleine. The findOne method's result will be passed to the populate and the cart.product will be referenced to the pirticular product and that product details will be displayed in the cart
  
  //if user not found
  if (!userObj) {
    res.status(404).json({ message: "user not found" });
  } else {
    //send res
    res.status(200).json({ message: "users", payload: userObj });
  }
});

//Update User by id
userApp.put("/users/:id",verifyToken, async (req, res) => {
  //get modified user from req
  const modifiedUser = req.body;
  const uid = req.params.id;
  const updatedUser = await UserModel.findByIdAndUpdate(
    uid,
    { $set: { ...modifiedUser } },
    { new: true, runValidators: true },
  );
  res
    .status(200)
    .json({ message: "user updated successfully", payload: updatedUser });
});

// Delete User by id
userApp.delete("/users/:id",verifyToken, async (req, res) => {
  const uid = req.params.id;
  const deletedUser = await UserModel.findByIdAndDelete(uid);
  if (!deletedUser) {
    return res.status(404).json({ message: "user not found" });
  } else {
    res
      .status(200)
      .json({ message: "user deleted successfully", payload: deletedUser });
  }
});

//add product to cart
// userApp.put("/cart/product-id/:pid",verifyToken, async(req, res) => {
//   //get porduct id from url param
//   let pid = req.params.pid;
//   //get the current user details
//   const emailofUser = req.user?.email;
//   //check if the product is there in the cart or not if yes increment the count
//   //add porduct to cart
//   let result = await UserModel.findOneAndUpdate({email:emailofUser}, {
//     $push:{
//       cart:{
//         product:pid
//       }
//     }
//     })
//     //if user is invalid
//     if(!result){
//       return res.status(404).json({message:"user not found"})
//     }
//     //get the product name
//   // let product = await ProductModel.findById(pid);
//   // if(!product){
//   //   return res.status(404).json({message:"product not found"})
//   // }
//   // let productName = product.productName

//     res.status(200).json({message:"product added to cart"})

// })

/* status code
200 - success operations
201 - created a resource/document
400 - bad request from the client or incorrect request from the client
401 - Unauthorized 
404 - Page not found
500 - Server side error
*/

//add product to cart and update count
userApp.put("/cart/product-id/:pid",verifyToken, async(req, res) => {
  //get porduct id from url param
  let pid = req.params.pid;
  //get the current user details
  const emailofUser = req.user?.email;
  //check if the product is there in the cart or not if yes increment the count
  let x = await UserModel.findOne({email:emailofUser, "cart.product":pid})
  if(x){
    await UserModel.findOneAndUpdate({email:emailofUser, "cart.product":pid}, {
      $inc:{
        "cart.$.count": 1
      }})
      res.status(200).json({message:"Product count updated in cart"})
  } else{
     //add porduct to cart
  let result = await UserModel.findOneAndUpdate({email:emailofUser}, {
    $push:{
      cart:{
        product:pid
      }
    }
    })
    //if user is invalid
    if(!result){
      return res.status(404).json({message:"user not found"})
    }
    res.status(200).json({message:"product added to cart"})
  }
 
    //get the product name
  // let product = await ProductModel.findById(pid);
  // if(!product){
  //   return res.status(404).json({message:"product not found"})
  // }
  // let productName = product.productName

})

