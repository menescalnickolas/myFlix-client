import React from "react";
import PropTypes from "prop-types";
import "./user-info.jsx";
import "./user-info.scss";

export const UserInfo = ({ email, name, birthday }) => {
  return (
    <div className="user-info card">
      <div className="card-body">
        <h5 className="info-card-title">User Information</h5>
        <ul clanssName="list-group list-group-flush">
          <li className="list-group-item">Username: {name}</li>
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">Birthday: {birthday}</li>
        </ul>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
};