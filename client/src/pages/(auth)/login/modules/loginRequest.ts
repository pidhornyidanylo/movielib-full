import Toastify from "toastify-js";

const BACK_URL: string = import.meta.env.VITE_BACK_URL;

type LoginRequestReturnType = {
  email: string;
  success: string;
  token: string;
};

export const loginUserWithCredentials = async (
  email: string,
  password: string
): Promise<LoginRequestReturnType | undefined> => {
  try {
    const response = await fetch(`${BACK_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (!response.ok) {
      Toastify({
        text: "Wrong credentials!",
        className: "info-toast",
        gravity: "bottom",
        position: "right",
        style: {
          background: "#e0a2a2",
        },
      }).showToast();
    } else {
      Toastify({
        text: "Logged in!",
        className: "info-toast",
        gravity: "bottom",
        position: "right",
        style: {
          background: "#a2c3e0",
        },
      }).showToast();
      const data = await response.json();
      const token = data.token as string;
      const userEmail = data.email as string;
      localStorage.setItem("token", token);
      localStorage.setItem("user", userEmail);
      history.pushState({}, "", "/");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      return data;
    }
  } catch (error: unknown) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
