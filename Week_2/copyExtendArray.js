// Exercise 1: Copy & Extend an Array
let fruits = ["apple", "banana"];
let moreFruits = [...fruits, "orange"];
console.log(fruits);
console.log(moreFruits);



// Exercise 2: Update User Object
let user = {
  name: "Ravi",
  city: "Hyderabad"
};

let updatedUser = { ...user, age: 25 };
console.log(user);
console.log(updatedUser);


//Exercise 3: Create a function that receives any number of args as arguments and return their sum using REST parameter
function sum(...numbers) {
  let total = 0;
  for (let num of numbers) {
    total += num;
  }
  return total;
}
console.log(sum(2, 3, 4));
console.log(sum(200, 300, 400));