import React, { useEffect, useState } from "react";
import { Users } from "../../src/domain/User";
import { getUserProfile } from "../../src/useCases/user/getCurrentUser";
import "../css/profile.css";
import { editUserProfile } from "../../src/useCases/user/getCurrentUser";

export default function Profile() {
  const [user, setUser] = useState<Users | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<Users | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getUserProfile();
        console.log("Loaded user:", data);
        setUser(data);
        setEditedUser(data); // Initialize edit fields
      } catch (err) {
        console.error("Error loading user profile", err);
      }
    }
    loadUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedUser) return;
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (!editedUser) return;
      await editUserProfile(editedUser);
      setUser(editedUser);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to save profile");
    }
  };
  if (!user || !editedUser) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-heading">My Profile</h2>

      <div className="profile-detail">
        <label>Name:</label>
        {editMode ? (
          <input
            type="text"
            name="fullName"
            value={editedUser.fullName}
            onChange={handleChange}
          />
        ) : (
          <p>{user.fullName}</p>
        )}
      </div>

      <div className="profile-detail">
        <label>Address:</label>
        {editMode ? (
          <input
            type="text"
            name="address"
            value={editedUser.address}
            onChange={handleChange}
          />
        ) : (
          <p>{user.address}</p>
        )}
      </div>

      <div className="profile-detail">
        <label>NIC Number:</label>
        {editMode ? (
          <input
            type="text"
            name="nic"
            value={editedUser.nic}
            onChange={handleChange}
          />
        ) : (
          <p>{user.nic}</p>
        )}
      </div>

      <div className="profile-detail">
        <label>Date of Birth:</label>
        {editMode ? (
          <input
            type="date"
            name="dob"
            value={editedUser.dob.split("T")[0]} // format YYYY-MM-DD
            onChange={handleChange}
          />
        ) : (
          <p>{new Date(user.dob).toLocaleDateString()}</p>
        )}
      </div>

      <div className="profile-detail">
        <label>User Type:</label>
        <p>{user.userType}</p> {/* Usually userType is not editable */}
      </div>

      <div className="profile-buttons">
        {editMode ? (
          <>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button
              className="cancel-button"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button className="edit-button" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
