import React, { useState } from "react";
import axios from "axios";
import { UserInfo } from "./user-info";
import { Link } from "react-router-dom";
import { UserUpdate } from "./user-update";
import { UserDelete } from "./user-deregister";
import { FavoriteMovies } from "./favorite-movies";
import { Button } from "react-bootstrap";
import "./profile-view.scss";


export const ProfileView = ({ movies, user: initialUser, onToggleFavorite }) => {
  const [user, setUser] = useState(initialUser);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);




  return (
    <div>
      <div className="user-info">
        <UserInfo
          name={user.Username}
          email={user.Email}
          birthday={user.Birthday}
          password={user.Password}
        />
      </div>
      <div className="user-update">
      <Button variant="primary" onClick={handleShowModal}>
          Update User Information
        </Button>
        <UserUpdate
          name={user.Username}
          email={user.Email}
          birthday={user.Birthday}
          password={user.Password} 
          show={showModal}
          handleClose={handleCloseModal}/>
      </div>
      <div className="user-delete">
        <UserDelete />
      </div>
      <div className="favorite-movies">
        <h3>Your favorite movies:</h3>
        <FavoriteMovies movies={movies} user={user} setUser={setUser} onToggleFavorite={onToggleFavorite}/>
      </div>
    </div>

  );
};
