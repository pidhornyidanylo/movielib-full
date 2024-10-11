import { movie } from "../../pages";
import { publicRoutes, secureRoutes } from "../../routes";

export const handleMain = <T extends HTMLElement, A extends boolean>(
  main: T,
  auth: A
): void => {
  main.innerHTML = `
        <section class="container-section">
          ${
            auth
              ? secureRoutes[window.location.pathname]
                ? secureRoutes[window.location.pathname].content
                : "<div><h4>You have to logout to access login or register route. Access denied.</h4></div>"
              : publicRoutes[window.location.pathname]
              ? publicRoutes[window.location.pathname].content
              : `<div><h4>You are trying to access a secure route. Access denied. </br>Please, ${
                  window.location.pathname === "/login"
                    ? '<a href="/">home</a>'
                    : '<a href="/login">login</a>'
                }.</h4></div>`
          }
        </section>
    `;
  if (window.location.pathname.includes("/movie/")) {
    main.innerHTML = `${movie}`;
  }
};
