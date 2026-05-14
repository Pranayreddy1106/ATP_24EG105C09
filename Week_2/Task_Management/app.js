// app.js

import {
  addTask,
  getAllTasks,
  completeTask
} from "./task.js";

// 1. Add tasks
console.log(addTask("Study JS", "high", "2026-12-30"));
console.log(addTask("Go Gym", "medium", "2026-05-01"));
console.log(addTask("Hi", "low", "2023-01-01")); 

// 2. Display all tasks
console.log("\nAll Tasks:");
console.log(getAllTasks());

// 3. Complete a task
console.log("\nCompleting Task 1:");
console.log(completeTask(1));

// 4. Display all tasks again
console.log("\nUpdated Tasks:");
console.log(getAllTasks());