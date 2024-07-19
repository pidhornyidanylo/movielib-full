import Toastify from "toastify-js";
import { registerUserWithCredentials } from "./registerRequest";

export const registerHandler = <T extends HTMLElement>(container: T): void => {
  container.innerHTML = `
    <form id="register-form" class="register-form">
      <h3 class="register-title">Register</h3>
        <div class="input-container">
          <label>Email</label>
          <input type="email" id="register-email" reuired />
        </div>
        <div class="input-container">
          <label>Password</label>
          <input type="password" id="register-password" reuired />
        </div>
        <div class="input-container">
          <label>Confirm password</label>
          <input type="password" id="register-confirm" reuired />
        </div>
        <button id type="submit">Create new user</button>
    </form>
    `;

  const form = container.querySelector<HTMLFormElement>("#register-form");
  if (form) {
    form.addEventListener("submit", async (event: Event) => {
      event.preventDefault();
      const emailInputElement =
        container.querySelector<HTMLInputElement>("#register-email");
      const passwordInputElement =
        container.querySelector<HTMLInputElement>("#register-password");
      const confirmPasswordInputElement =
        container.querySelector<HTMLInputElement>("#register-confirm");
      if (
        emailInputElement?.value &&
        passwordInputElement?.value &&
        confirmPasswordInputElement?.value
      ) {
        if (passwordInputElement.value !== confirmPasswordInputElement.value) {
          Toastify({
            text: "Please, try again!",
            className: "info-toast",
            gravity: "bottom",
            position: "right",
            style: {
              background: "#e0a2a2",
            },
          }).showToast();
          passwordInputElement.value = "";
          confirmPasswordInputElement.value = "";
          return;
        }
        await registerUserWithCredentials(
          emailInputElement.value,
          passwordInputElement.value
        );
        emailInputElement.value = "";
        passwordInputElement.value = "";
        confirmPasswordInputElement.value = "";
      }
    });
  } else {
    console.error("Register form element not found!");
  }
};
