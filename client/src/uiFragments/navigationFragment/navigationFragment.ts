import Toastify from "toastify-js";
import { logoutUser } from "../../pages/(auth)/login/modules/logoutRequest";
import { updateMain } from "../../uiUpdaters";
import "./navigationFragment.scss";
import { clearStorage } from "../searchFrament/searchFragment";

export const handleNavBar = <T extends HTMLElement, B extends boolean>(
  header: T,
  isAuth: B
): void => {
  if (isAuth) {
    header.innerHTML = `
      <nav class="navbar-nav">
        <button class="burger-menu" id="burger-menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul class="navbar-list">
          <li><a class="nav-link" href="/">Home</a></li>
          <li><a class="nav-link" href="/favourites">Favourites</a></li>
          <li><a class="nav-link" href="/about">About</a></li>
          <li><a class="nav-link" href="/settings">Settings</a></li>
          <li><a id="logout-link" href="#">Logout</a></li>
        </ul>
      </nav>
    `;
  } else {
    header.innerHTML = `
      <nav class="navbar-nav">
        <button class="burger-menu" id="burger-menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul class="navbar-list">
          <li><a class="nav-link" href="/">Home</a></li>
          <li><a class="nav-link" href="/about">About</a></li>
          <li><a class="nav-link" href="/settings">Settings</a></li>
          <li><a class="nav-link" href="/login">Login</a></li>
          <li><a class="nav-link" href="/register">Register</a></li>
        </ul>
      </nav>
    `;
  }

  const navLinks = document.querySelectorAll(".nav-link");
  for (const link of navLinks) {
    link.addEventListener("click", async (event: Event): Promise<void> => {
      event.preventDefault();
      clearStorage();
      const href = (event.target as HTMLAnchorElement).getAttribute("href");
      if (href) {
        history.pushState({}, "", href);
        await updateMain();
      }
    });
  }

  const logoutLink = document.querySelector<HTMLLinkElement>("#logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", (event: Event): void => {
      event.preventDefault();
      logoutUser();
      Toastify({
        text: "Logged out!",
        className: "info-toast",
        gravity: "bottom",
        position: "right",
        style: {
          background: "#a2c3e0",
        },
      }).showToast();
    });
  }

  const burgerMenu = document.getElementById("burger-menu");
  const navbarList = document.querySelector(".navbar-list");

  if (burgerMenu && navbarList) {
    burgerMenu.addEventListener("click", (): void => {
      navbarList.classList.toggle("active");
    });
  }
};
export const setActiveLink = (): void => {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");
  for (const link of navLinks) {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
};

window.addEventListener("popstate", async (event: Event): Promise<void> => {
  event.preventDefault();
  await updateMain();
});
