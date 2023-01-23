//intro section functional
const createTodoList = document.getElementById("createTodoList");
const introSection = document.querySelector(".todo-container");
const todoListSection = document.querySelector(".todo__list-place");
createTodoList.addEventListener("click", () => {
  introSection.classList.toggle("disactive");
  todoListSection.classList.toggle("disactive");
});

//------------------------------------------------------------------

// todo list section functional
const userList = document.querySelector("#user-list");
const addOptionBtn = document.getElementById("add-option");
const inputOption = document.getElementById("input-list-options");

const addUserInputedOption = () => {
  let divWrap = document.createElement("div");
  divWrap.className = `todo-list-option${index} optional`;
  divWrap.innerHTML = `
      <input type="checkbox" name="checkbox" id="${index}" class = "check-box">
      <label for="${index}" class = "option-label">${inputOption.value}</label>
    `;
  userList.insertAdjacentElement("beforeend", divWrap);
  index++;
  inputOption.value = "";
};

let index = 0;
addOptionBtn.addEventListener("click", () => {
  addUserInputedOption();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputOption.value !== "") {
    addUserInputedOption();
  }
});

// checked options

userList.addEventListener("change", () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const labels = document.querySelectorAll("label");
  checkboxes.forEach((checkbox) => {
    labels.forEach((label) => {
      if (checkbox.getAttribute("id") === label.getAttribute("for")) {
        if (checkbox.checked) {
          label.classList.add("checked");
          document
            .querySelector(`.todo-list-option${checkbox.getAttribute("id")}`)
            .classList.add("checked_option");
        } else {
          label.classList.remove("checked");
          document
            .querySelector(`.todo-list-option${checkbox.getAttribute("id")}`)
            .classList.remove("checked_option");
        }
      }
    });
  });
});

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
  userList.innerHTML = "";
});

//-------------------------------

// add interesting animation  for hovering notes: delete
// click on added option  --> show delete button --> delete if button was clicked

// const checkLabels = document.querySelectorAll("label");
// document.addEventListener("change", () => {
//   checkLabels.forEach((label) => {
//     if (label.classList.contains("checked")) {
//       let deleteButton = document.createElement("button");
//       deleteButton.innerHTML = "Delete";
//       deleteButton.className = "button";
//       label.insertAdjacentElement("beforeend", deleteButton);
//       console.log("i work ");
//     }
//   });
// });
