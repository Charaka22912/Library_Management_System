import { User } from "../../domain/User";
import { Users } from "../../domain/User";
import { userStorage } from "../../infrastructure/userStorage";
import { fetchUserProfile } from "../../infrastructure/userStorage";
import { updateUserProfile } from "../../infrastructure/userStorage";

export const getCurrentUser = (): User | null => {
  const username = userStorage.getUsername();
  const userType = userStorage.getUserType();
  const userId = userStorage.getUserId();

  if (username && userType && userId) {
    return { username, userId, userType: userType as User["userType"] };
  }
  return null;
};

export const getUserProfile = async (): Promise<Users> => {
  return await fetchUserProfile();
};

export const editUserProfile = async (user: Users): Promise<Users> => {
  return await updateUserProfile(user);
};
