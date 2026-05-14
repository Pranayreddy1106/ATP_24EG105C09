import {
  validateTitle,
  validatePriority,
  validateDueDate
} from "./validator.js";

let taks = []
let idCounter = 1

export function addTask(title, priority, dueDate){
    const titleError = validateTitle(title);
    const priorityError = validatePriority(priority);
    const dateError = validateDueDate(dueDate);

    if(titleError) return titleError;
    if(priorityError) return priorityError;
    if(dateError) return dateError;

    const newTask = {
        id: idCounter++,
        title,
        priority,
        dueDate,
        completed: false
    }

    taks.push(newTask)
    return "Task added successfully!"
}

export function getAllTasks(){
    return taks
}

export function completeTask(taskId){
    const task = taks.find(t => t.id == taskId)
    if(!task){
        return "Task not found"
    }
    task.completed = true
    return "Task marked as complete"
}


