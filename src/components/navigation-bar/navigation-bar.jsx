import React, { useState } from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut, setFilteredMovies, movies }) => {

  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterMovies(query);
  };

  const filterMovies = (query) => {
    console.log("Query:", query); //Log the search query

    if (!query) {
      setFilteredMovies([]); // Clear filtered movies when query is empty
      return;
    }

    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log("Filtered Movies:", filtered); // Log the filtered movies
    setFilteredMovies(filtered);
  };

  return (
    <Navbar className="navbar-custom">
      <Container >
        <Navbar.Brand as={Link} to="/" className="navbar-brand" expand="lg">
          CineScope
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto texts">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
               
              </>
            )}
          </Nav>
          {user && (
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleInputChange}
              />
            </Form>
          )} 
          <Nav.Link onClick={onLoggedOut} className="logoutbutton">
            <Button variant="outline-danger">Logout</Button>
            </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};