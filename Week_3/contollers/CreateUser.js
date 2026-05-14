// export function createUser = async (req, res) => {
//   //get new user obj from req
//   const newUser = req.body;
//   //hash the password
//   const hashedPassword = await hash(newUser.password, 10);
//   //replace plain password with the hashed password
//   newUser.password = hashedPassword;
//   //create new user document
//   const newUserDocument = new UserModel(newUser);
//   //save user document
//   const result = await newUserDocument.save();
//   console.log(result);
//   // send res
//   res
//     .status(201)
//     .json({ message: "user created successfully", payload: result });
// }