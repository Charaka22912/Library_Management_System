export const userStorage = {
  getUsername: () => localStorage.getItem("username"),
  getUserType: () => localStorage.getItem("userType"),
  clearUser: () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userType");
  },
};
