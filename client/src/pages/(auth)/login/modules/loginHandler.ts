import { loginUserWithCredentials } from "./loginRequest";

export const loginHandler = <T extends HTMLElement>(container: T): void => {
  container.innerHTML = `
    <form id="login-form" class="login-form">
      <h3 class="login-title">Login</h3>
      <div class="input-container">
        <label>Email</label>
        <input type="email" id="login-email" reuired />
      </div>
      <div class="input-container">
        <label>Password</label>
        <input type="password" id="login-password" reuired />
      </div>
      <button id="login-btn" type="submit">Check credentials</button>
    </form>
    `;

  const form = container.querySelector<HTMLFormElement>("#login-form");
  if (form) {
    form.addEventListener("submit", async (event: Event) => {
      event.preventDefault();
      const emailInputElement =
        container.querySelector<HTMLInputElement>("#login-email");
      const passwordInputElement =
        container.querySelector<HTMLInputElement>("#login-password");
      if (
        emailInputElement &&
        emailInputElement.value &&
        passwordInputElement &&
        passwordInputElement.value
      ) {
        await loginUserWithCredentials(
          emailInputElement.value,
          passwordInputElement.value
        );
        emailInputElement.value = "";
        passwordInputElement.value = "";
      }
    });
  } else {
    console.error("Login form element not found");
  }
};
