import React, { useEffect, useState } from "react";
import { Users } from "../../src/domain/User";
import "../css/admin.css";
import { getAllUsers, deleteUserById } from "../infrastructure/userStorage";

export default function UserManagement() {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
        alert("Error loading users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUserById(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="user-management">
      <div className="book-list-container">
        <h1 className="heading">All registerd Users</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>NIC</th>
            <th>DOB</th>
            <th>Address</th>
            <th>User Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.nic}</td>
              <td>{user.dob?.split("T")[0]}</td>
              <td>{user.address}</td>
              <td>{user.userType}</td>
              <td>
                <button
                  onClick={() => handleDelete(user.id!)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
