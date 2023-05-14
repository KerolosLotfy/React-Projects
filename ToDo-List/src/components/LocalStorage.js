// Get Lists From Local Storage
function Get() {
  if (
    localStorage.lists &&
    JSON.parse(localStorage.getItem("lists"))[0] !== undefined
  ) {
    return JSON.parse(localStorage.getItem("lists"));
  }
}

// Store Lists in Local Storage
function Add(value) {
  localStorage.setItem("lists", JSON.stringify(value));
}

// Update Lists in Local Storage
function Update(updatedValue) {
  Add(updatedValue);
}

export { Get, Add, Update };
