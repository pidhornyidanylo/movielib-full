import Toastify from "toastify-js";

const BACK_URL: string = import.meta.env.VITE_BACK_URL;

type RegisterRequestReturnType = {
  success: string;
  user: {
    email: string;
    id: string;
  };
};

export const registerUserWithCredentials = async (
  email: string,
  password: string
): Promise<RegisterRequestReturnType | undefined> => {
  try {
    const response = await fetch(`${BACK_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      Toastify({
        text: "Please, try again!",
        className: "info-toast",
        gravity: "bottom",
        position: "right",
        style: {
          background: "#e0a2a2",
        },
      }).showToast();
    } else {
      Toastify({
        text: "User have been successfully created! 💻",
        className: "info-toast",
        gravity: "bottom",
        position: "right",
        style: {
          background: "#a2c3e0",
        },
      }).showToast();
      const data = await response.json();
      return data;
    }
  } catch (error: unknown) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
