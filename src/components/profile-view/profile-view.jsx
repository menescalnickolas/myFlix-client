import React from "react";

export const ProfileView = () => {

  return (
    <div>
    <h1>Profile</h1>
    {user && (
      <div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p>Favorite Movies:</p>
      </div>
    )}
  </div>
);
};
 