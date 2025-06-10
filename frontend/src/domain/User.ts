export type User = {
  username: string;
  userId: string;
  userType: "Student" | "Employee";
};

export type Users = {
  id: number;
  userId: string;
  fullName: string;
  address: string;
  dob: string;
  nic: string;
  userType: string;
  password: string; // must be present even if not editable
  username: string; // must be present
  employeeID: string;
};
