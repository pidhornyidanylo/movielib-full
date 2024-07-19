import { updateMain, updateNavBar } from "./uiUpdaters";
import "./style.css";

export const renderApp = () => {
  const app = document.querySelector("#app");
  if (app) {
    app.innerHTML = `
        <header id="header"></header>
        <main id="main"></main>
    `;
  }
};

renderApp();

document.addEventListener("DOMContentLoaded", async (): Promise<void> => {
  updateNavBar();
  await updateMain();
});
