//find the smallest of marks in [85,58,34,90,95]

let marks = [85, 58, 34, 90, 95];
let smallest = marks[0];
for (let i = 1; i < marks.length; i++) {
  if (marks[i] < smallest) {
    smallest = marks[i];
  }
}

console.log(smallest);
