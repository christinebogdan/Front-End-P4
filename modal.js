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
const regExDate = new RegExp(
  "(19[0-9][0-9]|20[0-4][0-9]|2050)[-](0?[1-9]|1[0-2])[-]([0][1-9]|[12][0-9]|3[01])$"
);

// data-error messages paired with elements input element IDs
const errorMessages = {
  first: "Please enter 2+ characters for name field.",
  last: "Please enter 2+ characters for name field.",
  email: "Please enter a valid email address.",
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

// close modal form + reset form input + remove error styling
function closeModal() {
  modalbg.style.display = "none";
  form.reset();
  removeInvalidStyling();
  removeConfirmation();
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
  if (!regExEmail.test(email.value)) {
    falseValues.push(email);
  }

  if (!regExDate.test(birthDate.value)) {
    falseValues.push(birthDate);
  }
  // validate tournament attendance
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

function removeConfirmation() {
  confirmationMessage.style.display = "none";
  submitBtn.value = "Go";
  form.removeEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  });
  form.addEventListener("submit", onSubmit);
}

// handle submit event
form.addEventListener("submit", onSubmit);
