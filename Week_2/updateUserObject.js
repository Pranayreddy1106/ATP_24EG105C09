
//💡 Exercise 2: Update User Object
// import { use } from "react";                       
//Goal: Learn object cloning & adding new property                      
//You are given:
                                
let user = {
name: "Ravi",
city: "Hyderabad"
};                                            
//Tasks
                        
// -> Create a new object updatedUser
let updatedUser={};

// -> Copy all properties from user
updatedUser={...updatedUser};

// -> Add a new property age: 25
updatedUser={...user,age:25};

// -> Print both objects
console.log(user);
console.log(updatedUser);