import { User } from "../../domain/User";
import { userStorage } from "../../infrastructure/userStorage";

export const getCurrentUser = (): User | null => {
  const username = userStorage.getUsername();
  const userType = userStorage.getUserType();

  if (username && userType) {
    return { username, userType: userType as User["userType"] };
  }
  return null;
};
