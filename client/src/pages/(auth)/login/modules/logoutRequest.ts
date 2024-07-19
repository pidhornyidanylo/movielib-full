export const logoutUser = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setTimeout(() => {
    window.location.reload();
  }, 1500);
};
