//💡 Exercise 3: Create a function that receives any number of args as arguments and return their sum using REST parameter
function sumOfElements(...nums){
    let sum=0;
    for(let number of nums){
        sum+=number;
    }
    return sum;
}
let arraySum=sumOfElements(1,2,3,4,55);
console.log("The sum of elements is :",arraySum);