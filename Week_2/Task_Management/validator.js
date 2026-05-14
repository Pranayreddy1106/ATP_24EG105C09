// 1. Validate task title (not empty, min 3 chars)
export function validateTitle(title) {
  if (!title || title.trim().length < 3) {
    return "Title must be at least 3 characters long.";
  }
  return null; // null means valid
}

// 2. Validate priority (must be: low, medium, high)
export function validatePriority(priority) {
  const allowed = ["low", "medium", "high"];
  if (!allowed.includes(priority.toLowerCase())) {
    return "Priority must be low, medium, or high.";
  }
  return null;
}

// 3. Validate due date (must be future date)
export function validateDueDate(date) {
  const inputDate = new Date(date);
  const today = new Date();

  if (isNaN(inputDate)) {
    return "Invalid date format.";
  }

  if (inputDate <= today) {
    return "Due date must be a future date.";
  }

  return null;
}