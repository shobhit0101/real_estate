// const sign_in_btn = document.querySelector("#sign-in-btn");
// const sign_up_btn = document.querySelector("#sign-up-btn");
// const container = document.querySelector(".container");

// sign_up_btn.addEventListener("click", () => {
//   container.classList.add("sign-up-mode");
// });

// sign_in_btn.addEventListener("click", () => {
//   container.classList.remove("sign-up-mode");
// });


function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove("form_message--success", "form_message--error");
  messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error");
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  document.querySelector("#linkCreateAccount").addEventListener("click", e => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
  });

  document.querySelector("#linkLogin").addEventListener("click", e => {
      e.preventDefault();
      loginForm.classList.remove("form--hidden");
      createAccountForm.classList.add("form--hidden");
  });

  loginForm.addEventListener("submit", e => {
      e.preventDefault();

      // Perform your AJAX/Fetch login

      setFormMessage(loginForm, "error", "Invalid username/password combination");
  });

  document.querySelectorAll(".form__input").forEach(inputElement => {
      inputElement.addEventListener("blur", e => {
          if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
              setInputError(inputElement, "Username must be at least 10 characters in length");
          }
          if (e.target.id === "email" && e.target.value.length > 0 && e.target.value.length < 10) {
              setInputError(inputElement, "email must be at least 10 characters in length");
           }
          
          if (e.target.id === "email") {
              
              if(!(e.target.value.includes('@')))
                  setInputError(inputElement, "Format of email is wrong: must contain @");
                  
                      
              
          }
          let a;
          if (e.target.id === "pass" && e.target.value.length > 0 && e.target.value.length < 8) {
              a=e.target.value;
              setInputError(inputElement, "password must be at least 8 characters in length");
           }
           if (e.target.id === "pass2" && e.target.value!=a) {
              setInputError(inputElement, "passwords don't match");
           }
           let phoneno = /^\d{10}$/;
           if (e.target.id === "mob" && !e.target.value.match(phoneno)) {
              setInputError(inputElement, "invalid mobile no.");
           }
      });

      inputElement.addEventListener("input", e => {
          clearInputError(inputElement);
      });
  });
});