// Retrieve items from localStorage or initialize an empty array
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// Event listener for clicking the enter button
document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
});

// Event listener for pressing the Enter key
document.querySelector("#item").addEventListener("keypress", (e) => {
  if(e.key === "Enter") {
    const item = document.querySelector("#item");
    createItem(item);
  }
});

// Function to display the current date
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  date = date[1] + " " + date[2] + " " + date[3];
  document.querySelector("#date").innerHTML = date;
}

// Function to display the items in the todo list
function displayItems() {
  let items = "";
  for(let i = 0; i < itemsArray.length; i++) {
    items += `<div class="item my-2"> <!-- Creating each todo item -->
                <div class="input-controller form-floating d-flex justify-content-center align-items-center">
                  <textarea disabled class="form-control" id="floatingTextarea2" placeholder="Leave a comment here">${itemsArray[i]}</textarea>
                  <label for="floatingTextarea2">Comments</label>
                  <div class="edit-controller">
                    <i class="fa-solid fa-check deleteBtn mx-2" style="cursor:pointer;"></i> <!-- Delete button -->
                    <i class="fa-solid fa-pen-to-square editBtn mx-2" style="cursor:pointer;"></i> <!-- Edit button -->
                  </div>
                </div>
                <div class="update-controller"> <!-- Controller for updating items -->
                  <button class="saveBtn btn btn-outline-primary my-2">Save</button> <!-- Save button -->
                  <button class="cancelBtn btn btn-outline-primary my-2">Cancel</button> <!-- Cancel button -->
                </div>
              </div>`;
  }
  document.querySelector(".to-do-list").innerHTML = items; // Displaying items in the todo list
  activateDeleteListeners(); // Activating delete listeners for each item
  activateEditListeners(); // Activating edit listeners for each item
  activateSaveListeners(); // Activating save listeners for each item
  activateCancelListeners(); // Activating cancel listeners for each item
}

// Function to activate delete listeners for each item
function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => { deleteItem(i); });
  });
}

// Function to activate edit listeners for each item
function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => { 
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

// Function to activate save listeners for each item
function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
}

// Function to activate cancel listeners for each item
function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
      inputs[i].style.border = "none";
    });
  });
}

// Function to create a new item
function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload(); // Reload the page to display updated list
}

// Function to delete an item
function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload(); // Reload the page to display updated list
}

// Function to update an item
function updateItem(text, i) {
  itemsArray[i] = text;
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload(); // Reload the page to display updated list
}

// Load functions when the window is loaded
window.onload = function() {
  displayDate();
  displayItems();
};
