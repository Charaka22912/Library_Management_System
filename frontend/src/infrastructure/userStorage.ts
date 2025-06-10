import { Users } from "../domain/User";

export const userStorage = {
  getUsername: () => localStorage.getItem("username"),
  getUserType: () => localStorage.getItem("userType"),
  getUserId: () => localStorage.getItem("userId"),
  clearUser: () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
  },
};

export const getAllUsers = async () => {
  const res = await fetch("http://localhost:5275/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const deleteUserById = async (id: number) => {
  const res = await fetch(`http://localhost:5275/api/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
};

export const fetchUserProfile = async (): Promise<Users> => {
  const userId = localStorage.getItem("userId");

  if (!userId) throw new Error("User ID not found in localStorage");

  const res = await fetch(`http://localhost:5275/api/users/profile/${userId}`);

  if (!res.ok) throw new Error("Failed to fetch user profile");
  return res.json();
};

export const updateUserProfile = async (user: Users): Promise<Users> => {
  console.log("Updating user profile with data:", user);
  const userId = localStorage.getItem("userId");
  const payload = {
    FullName: user.fullName,
    Address: user.address,
    Nic: user.nic,
    Dob: new Date(user.dob).toISOString(),
    UserType: user.userType, // must be present
    Password: user.password, // must be present even if not editable
    Username: user.username, // must be present
    EmployeeID: user.employeeID, // must be present
  };
  const res = await fetch(`http://localhost:5275/api/users/update/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    console.error("Update failed with backend error:", errorData.errors);
    throw new Error(
      "Failed to update user profile: " + JSON.stringify(errorData.errors)
    );
  }

  return res.json();
};
