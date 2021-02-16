function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const form = document.getElementById("form");
const formData = document.querySelectorAll(".formData");
const submitBtn = document.getElementById("btn-submit");
const confirmationMessage = document.getElementById("confirmation");
const modalClose = document.querySelector(".close");

const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const tournamentsAttended = document.getElementById("quantity");
const radioButtons = document.querySelectorAll("[name='location']");
const radioButtonsArray = Array.from(radioButtons);
const termsAndCons = document.getElementById("checkbox1");

const regExEmail = new RegExp(
  "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/"
);

// data-error messages paired with elements input element IDs
const errorMessages = {
  first: "Please enter 2+ characters for name field.",
  last: "Please enter 2+ characters for name field.",
  email: "Please enter your email address.",
  birthdate: "Please enter your date of birth.",
  quantity: "Please enter a number between 0 and 99.",
  location1: "Please choose one option.",
  checkbox1: "Please agree to the terms and conditions.",
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalClose.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  // OPTIONAL: removeInvalidStyling();
  // OPTIONAL: remove confirmation message;
  modalbg.style.display = "none";
}

// check validity of user input fields
function getInvalidElements() {
  let falseValues = [];
  // validate first name
  if (!firstName.validity.valid) {
    falseValues.push(firstName);
  }
  // validate last name
  if (!lastName.validity.valid) {
    falseValues.push(lastName);
  }
  // validate email address
  // validation did not work with const regExEmail
  if (!email.validity.valid) {
    falseValues.push(email);
  }
  // does not return false for ##.##.#####
  if (!birthDate.validity.valid) {
    falseValues.push(birthDate);
  }
  // validate tournament attendance
  // could also do tournamentsAttended.validity.valid ?
  if (isNaN(parseInt(tournamentsAttended.value))) {
    falseValues.push(tournamentsAttended);
  }
  // validate radio buttons
  if (!radioButtonsArray.some((el) => el.checked)) {
    falseValues.push(radioButtons[0]);
  }
  // validate terms and cons
  if (!termsAndCons.checked) {
    falseValues.push(termsAndCons);
  }
  return falseValues;
}

// function to set style and error messages for invalid input fields
function styleInvalidElements(arrayInvalidInput) {
  for (let i = 0; i < arrayInvalidInput.length; i++) {
    let el = arrayInvalidInput[i];
    let elID = el.getAttribute("id");
    let parentElement = arrayInvalidInput[i].parentElement;
    parentElement.setAttribute("data-error-visible", "true");
    parentElement.setAttribute("data-error", errorMessages[elID]);
  }
}

// function to remove styling and messages of former invalid input fields
function removeInvalidStyling() {
  formData.forEach((node) => node.removeAttribute("data-error-visible"));
  formData.forEach((node) => node.removeAttribute("data-error"));
}

// Event handler for submit event
function onSubmit(e) {
  // prevent submission and page refresh
  e.preventDefault();
  // remove styling and messages of former invalid input fields
  removeInvalidStyling();
  // check validity of user input
  let invalidElements = getInvalidElements();
  if (invalidElements.length === 0) {
    // SOME FUNCTION FOR AJAX request
    console.log("submitted!");
    // change modal to confirmation message
    setConfirmation();
  } else {
    // set style and error messages for invalid input
    styleInvalidElements(invalidElements);
  }
}

// function to set confirmation message
// QUESTION: Why does submit go through without validation
// when I add the EventListener to the btn instead of the form
function setConfirmation() {
  confirmationMessage.style.display = "flex";
  submitBtn.value = "Close";
  form.removeEventListener("submit", onSubmit);
  form.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  });
}

// handle submit event
form.addEventListener("submit", onSubmit);

// Old code

// // check validity of user input fields
// function getInvalidElements() {
//   let falseValues = [];
//   // validate first name
//   if (firstName.value.length < 2) {
//     falseValues.push(firstName);
//   }
//   // validate last name
//   if (lastName.value.length < 2) {
//     falseValues.push(lastName);
//   }
//   // validate email address
//   if (!email.validity.valid || email.value === "") {
//     falseValues.push(email);
//   }
//   if (!birthDate.validity.valid || birthDate.value === "") {
//     falseValues.push(birthDate);
//   }
//   // validate tournament attendance
//   if (isNaN(parseInt(tournamentsAttended.value))) {
//     falseValues.push(tournamentsAttended);
//   }
//   // validate radio buttons
//   if (!radioButtonsArray.some((el) => el.checked)) {
//     falseValues.push(radioButtons[0]);
//   }
//   // validate terms and cons
//   if (!termsAndCons.checked) {
//     falseValues.push(termsAndCons);
//   }
//   return falseValues;
// }

// // setting invalid event listener on form element
// form.addEventListener("invalid", errorStyling);

// // function to set error styling
// function errorStyling(e) {
//   let targetID = e.target.getAttribute("id");
//   let targetParent = e.target.parentElement;
//   targetParent.setAttribute("data-error-visible", "true");
//   targetParent.setAttribute("data-error", errorMessages[targetID]);
// }

// // validate user input on submit
// form.addEventListener("submit", (e) => {
//   // prevent submission and page refresh
//   e.preventDefault();
//   // remove styling and messages of former invalid input fields
//   removeInvalidStyling();
//   // check validity of user input
//   let invalidElements = getInvalidElements();
//   if (invalidElements.length === 0) {
//     // SOME FUNCTION FOR AJAX request
//     console.log("submitted!");
//     // change modal to confirmation message
//     setConfirmation();
//   } else {
//     // set style and error messages for invalid input
//     styleInvalidElements(invalidElements);
//   }
// });

// // validate user input on submit
// function validate() {
//   // remove styling and messages of former invalid input fields
//   removeInvalidStyling();
//   // check validity of user input
//   let invalidElements = getInvalidElements();
//   if (invalidElements.length === 0) {
//     //return valid.length === 0;
//     return true;
//   } else {
//     // set style and error messages for invalid input
//     setInvalidStyling(invalidElements);
//     return false;
//   }
// }
