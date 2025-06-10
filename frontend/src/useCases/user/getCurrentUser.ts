import { User } from "../../domain/User";
import { Users } from "../../domain/User";
import { userStorage } from "../../infrastructure/userStorage";
import { fetchUserProfile } from "../../infrastructure/userStorage";
import { updateUserProfile } from "../../infrastructure/userStorage";

//getCurrentUser retrieves the current user's details from localStorage
export const getCurrentUser = (): User | null => {
  const username = userStorage.getUsername();
  const userType = userStorage.getUserType();
  const userId = userStorage.getUserId();

  if (username && userType && userId) {
    return { username, userId, userType: userType as User["userType"] };
  }
  return null;
};

//getAllUsers fetches all users from the backend API
export const getUserProfile = async (): Promise<Users> => {
  return await fetchUserProfile();
};

//deleteUserById deletes a user by their ID from the backend API
export const editUserProfile = async (user: Users): Promise<Users> => {
  return await updateUserProfile(user);
};
