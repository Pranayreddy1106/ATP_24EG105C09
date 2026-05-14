// Write a function that recieves an array & search element as args and return the index of the element if found else return "not found"

let array=[10,20,30,40,50];
let searchElement=80;

function findSearchElement(array,searchElement){
    for (let i=0;i<array.length;i++){
        if(array[i] === searchElement){
            return i;
    }
}
return "not found";
}

console.log(findSearchElement(array,searchElement));
