import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();// this prevents the default behavior of the form which is to reload the entire page

    const url = `https://testflix2-2b11acffaf24.herokuapp.com/login?Username=${encodeURIComponent(username)}&Password=${encodeURIComponent(password)}`;

    const data = {
      username: username,
      password: password
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("There's no such user!");
      }
    })
    .catch((e) => {
      alert("Something went wrong!");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength="5"
          required/>
      </label>
      <label>
        Password:
        <input type="password" value={password}
        onChange={(e) => setPassword(e.target.value)}
        required/>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};