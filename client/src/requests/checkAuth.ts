const BACK_URL = import.meta.env.VITE_BACK_URL;

export type Auth = {
  authenticated: boolean;
  user: {
    email: string;
    iat: number;
    exp: number;
  };
};

export const checkAuth = async (): Promise<Auth | boolean> => {
  const token = localStorage.getItem("token") as string;
  try {
    const response = await fetch(`${BACK_URL}/api/auth/check`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
};
