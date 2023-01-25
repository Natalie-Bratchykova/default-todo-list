"use strict";
//for local storage
let todoData = [];

let localId = () => {
  return Math.floor(Math.random() * Math.random() * 100);
};
//intro section functional
const createTodoList = document.getElementById("createTodoList");
const introSection = document.querySelector(".todo-container");
const todoListSection = document.querySelector(".todo__list-place");

const listWrap = document.querySelector(".todo__list-wrap");
listWrap.addEventListener("change", () => {
  if (inputOption.value === "") {
  }
});

createTodoList.addEventListener("click", () => {
  introSection.classList.toggle("disactive");
  todoListSection.classList.toggle("disactive");
});
//-----------------------------------------------------------------
// checked options
const changeItemIsCheckedStatus = (label, array) => {
  return array.map((item) => {
    if (item.id === label.id) {
      console.log(`CONDITION:from storage - ${item.id}`);
      item.isChecked = label.classList.contains("checked") ? true : false;
    }
  });
};
let changeItemInDom = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const labels = document.querySelectorAll("label");
  checkboxes.forEach((checkbox) => {
    labels.forEach((label) => {
      todoData = JSON.parse(localStorage.getItem("key"));
      if (checkbox.getAttribute("id") === label.getAttribute("for")) {
        if (checkbox.checked) {
          label.classList.add("checked");
          document
            .querySelector(`.todo-list-option${checkbox.id}`)
            .classList.add("checked_option");
        } else {
          label.classList.remove("checked");
          document
            .querySelector(`.todo-list-option${checkbox.getAttribute("id")}`)
            .classList.remove("checked_option");
        }

        changeItemIsCheckedStatus(label, todoData);
        localStorage.setItem(`key`, JSON.stringify(todoData));
      }
    });
  });
};
// todo list section functional
const userList = document.querySelector("#user-list");
const addOptionBtn = document.getElementById("add-option");
const inputOption = document.getElementById("input-list-options");

const localStorageGetData = () => {
  //get data
  if (localStorage.getItem("key")) {
    //get data
    todoData = JSON.parse(localStorage.getItem("key"));
    //output them to DOM
    todoData.forEach((item) => {
      let divWrap = document.createElement("div");
      divWrap.className = `todo-list-option${item.checkId} optional`;

      divWrap.innerHTML = `
          <input type="checkbox" name="checkbox" id="${
            item.checkId
          }" class = "check-box" ${item.isChecked ? "checked" : ""} >
          <label for="${item.checkId}" class = "option-label" id = "${
        item.id
      }">${item.name}</label>
        `;
      userList.append(divWrap);
      console.log(document.getElementById(`input[id = "${item.checkId}"]`));
    });
  } else {
    todoData = [];
  }
};

localStorageGetData();

const addUserInputedOption = () => {
  let checkboxId = localId();
  let divWrap = document.createElement("div");
  divWrap.className = `todo-list-option${checkboxId} optional`;
  divWrap.innerHTML = `
      <input type="checkbox" name="checkbox" id="${checkboxId}" class = "check-box">
      <label for="${checkboxId}" class = "option-label" id = "label${checkboxId}">${inputOption.value}</label>
    `;
  userList.insertAdjacentElement("beforeend", divWrap);
  // get elems from ls again(naaaaaaaaaaaaaaande?)
  todoData = localStorage.getItem("key")
    ? JSON.parse(localStorage.getItem("key"))
    : [];
  const createTodoDataObj = (array) => {
    let todoObj = {};
    todoObj.name = inputOption.value;
    todoObj.id = `label${checkboxId}`;
    todoObj.checkId = checkboxId;
    todoObj.isChecked = false;
    array.push(todoObj);
  };

  createTodoDataObj(todoData);
  localStorage.setItem(`key`, JSON.stringify(todoData));
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

userList.addEventListener("change", () => {
  changeItemInDom();
});

document.querySelectorAll('input[type = "checkbox"]').forEach((box) => {
  if (box.checked) {
    changeItemInDom();
  }
});

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
  if (confirm("Do you really want to delete all notes?")) {
    userList.innerHTML = "";
    localStorage.clear();
  }
});
