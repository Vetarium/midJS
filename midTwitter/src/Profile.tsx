import React, { useState } from 'react';
import { Header } from "./Header";
import { ProfileData } from "./data";

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({
    name: ProfileData.name,
    email: ProfileData.email,
    bio: ProfileData.bio
  });

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave(event) {
    event.preventDefault();
    ProfileData.name = tempData.name;
    ProfileData.email = tempData.email;
    ProfileData.bio = tempData.bio;
    setIsEditing(false);
  }

  function handleCancel() {
    setTempData({
      name: ProfileData.name,
      email: ProfileData.email,
      bio: ProfileData.bio
    });
    setIsEditing(false);
  }

  return (
    <div className="container">
      <Header />
      <h1>Profile</h1>
      <div>
        <form onSubmit={handleSave}>
          <label>
            First name
            {isEditing ? (
              <input 
                type="text" 
                name="name" 
                value={tempData.name} 
                onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
              />
            ) : (
              <div>{ProfileData.name}</div>
            )}
          </label>
          <br />
          <br />
          <label>
            Email
            {isEditing ? (
              <input 
                type="email" 
                name="email" 
                value={tempData.email} 
                onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
              />
            ) : (
              <div>{ProfileData.email}</div>
            )}
          </label>
          <br />
          <br />
          <label>
            Bio
            {isEditing ? (
              <textarea 
                name="bio" 
                value={tempData.bio} 
                onChange={(e) => setTempData({ ...tempData, bio: e.target.value })}
              />
            ) : (
              <div>{ProfileData.bio}</div>
            )}
          </label>
          <br />
          <br />
          {isEditing ? (
            <>
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button type="button" onClick={handleEdit}>Edit</button>
          )}
        </form>
      </div>
    </div>
  );
};
