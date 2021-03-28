let toDoListInput = document.getElementById("new-item");
let addButton = document.getElementById("addButton");
let toDolistTasks = document.getElementById("todoList");

//Checking the null condiditon for the input element
let addToDoTask = function() {
   if (toDoListInput.value == "") {
       alert("Please add task to continue");
       return;
   }
   let listItem = createNewTask(toDoListInput.value);
   toDolistTasks.appendChild(listItem);
   bindListEvents(listItem);
   toDoListInput.value = "";
}

//Creating new task
let createNewTask = function(taskName) {
    let listItem = document.createElement("li");
   
    //Creating elements
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");
 
    //Customizing elemets
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit-list";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete-list";
    label.innerText = taskName;
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

// On click Edit
let editTask = function() {

    let listItem = this.parentNode;
    let editInput = listItem.querySelector("input[type=text]");
    let label = listItem.querySelector("label");
    let containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }
    listItem.classList.toggle("editMode");

}

//On click delete
let deleteTask = function() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

//Binding events for edit and delete
let bindListEvents = function(taskListItem) {
  
    let editButton = taskListItem.querySelector("button.edit-list");
    let deleteButton = taskListItem.querySelector("button.delete-list");
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
}