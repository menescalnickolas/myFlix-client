import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";


export const UserUpdate = () => {
  const [storedToken, setStoredToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [storedUser, setStoredUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    setStoredUser(JSON.parse(localStorage.getItem("user")));
    setStoredToken(localStorage.getItem("token"));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found in localStorage");
      return;
    }

    const data = {
      Username: username,
      Password: password,
      Email: email, 
      Birthday: birthday
    };

    fetch(`https://testflix2-2b11acffaf24.herokuapp.com/users/${storedUser.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then ((response) => {
      if (response.ok) {
        alert ("Update successful!");
        const updatedUser = response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUsername(updatedUser.Username);
        setPassword(updatedUser.Password);
        setEmail(updatedUser.Email);
        setBirthday(updatedUser.Birthday);
        window.location.reload();
      } else {
        alert("Update failed!")
      }
    });
  };



  return (
    <Form onSubmit={handleSubmit}>
      <h1>Update User Information</h1>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength="5"
          required/>
      </Form.Group>
      
      <Form.Group controlId="formPassword"> 
        <Form.Label>Password: </Form.Label>
        <Form.Control type="password" value={password}
        onChange={(e) => setPassword(e.target.value)}
        required/>
      </Form.Group>

      <Form.Group controlId="formEmail"> 
        <Form.Label>Email: </Form.Label>
        <Form.Control type="email" value={email}
        onChange={(e) => setEmail(e.target.value)}
        required/>
      </Form.Group>

      <Form.Group controlId="formBirthday"> 
        <Form.Label>Date of Birth: </Form.Label>
        <Form.Control type="date" value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required/>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}; 