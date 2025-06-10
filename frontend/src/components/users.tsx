import React, { useEffect, useState } from "react";
//importing necessary components and styles

import { Users } from "../../src/domain/User";
import "../css/admin.css";
import { getAllUsers, deleteUserById } from "../infrastructure/userStorage";

export default function UserManagement() {
  const [users, setUsers] = useState<Users[]>([]); // State to hold the list of users
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Function to fetch all users from the backend
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

  // Function to handle user deletion
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

  // Render the component
  // If loading, show a loading message
  if (loading) return <p>Loading users...</p>;

  return (
    <div className="user-management">
      <div className="book-list-container">
        <h1 className="heading">All registerd Users</h1>
      </div>
      <table>
        {/* Table to display user information */}
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
                  onClick={() => handleDelete(user.id!)} // Handle delete button click
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
