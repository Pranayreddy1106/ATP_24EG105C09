// 1.Exam portal simulator:
// -----------------------------
// When a student submits an exam:

//         Immediately show: “Exam submitted successfully”
//         After 2 seconds → show: “Evaluating answers…”
//         After 4 seconds → show: “Result: Pass”

console.log("Exam submitted successfully");

// after 2 seconds
setTimeout(() => {
  console.log("Evaluating answers...");
}, 2000);

// after 4 seconds
setTimeout(() => {
  console.log("Result: Pass");
}, 4000);
