# CineScope
## Introduction
CineScope is a modern web application that allows users to browse, view, and manage their favorite movies. Users can sign up, log in, view a list of movies, see details of each movie, and manage their profile and favorite movies.

## Features
+ User authentication (login/register)
+ Browse and search movies
+ View movie details
+ Add and remove movies from favorites

## How to Set Up
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies using the command: npm install.
4. Start the application using the command: npm start.

## Dependencies
This project relies on the following dependencies:

- @fortawesome/fontawesome-svg-core: "^6.5.2"
- @fortawesome/free-regular-svg-icons: "^6.5.2"
- @fortawesome/free-solid-svg-icons: "^6.5.2"
- @fortawesome/react-fontawesome: "^0.2.2"
- axios: "^1.7.2"
- bootstrap: "^5.3.3"
- prop-types: "^15.8.1"
- react: "^18.3.1"
- react-bootstrap: "^2.10.3"
- react-dom: "^18.3.1"
- react-router: "^6.24.0"
- react-router-dom: "^6.24.0"

For development purposes, the following dependencies are also included:

- @parcel/transformer-sass: "^2.12.0"
- buffer: "^6.0.3"
- parcel: "^2.12.0"
- process: "^0.11.10"

## Tech Stack
**Frontend**
+ React
+ React Bootstrap
+ React Router
  
**Backend**
+ The backend API is hosted on Heroku (not included in this repository)

**Build Tools**
+ Parcel

## Usage
**Signup and Login:**
Users can sign up and log in to access the app.

**Browse Movies:**
Users can browse through a list of movies. The movies are fetched from the backend API.

**View Movie Details:**
Clicking on a movie card will show detailed information about the movie.

**Manage Favorites:**
Users can add or remove movies from their list of favorite movies.

**Profile Management:**
Users can view and update their profile information and see their favorite movies.

## API Endpoints
The application interacts with a backend API to perform various operations:

**Login:** POST /login - Validates user credentials and returns a token and user data.

**Movies:** GET /movies - Fetches a list of movies.

**User Movies:** POST /users/:username/movies/:movieId - Adds a movie to the user's favorites.

**User Movies:** DELETE /users/:username/movies/:movieId - Removes a movie from the user's favorites.

**User:** PUT /users/:username - Updates the user's information.

**User:** DELETE /users/:username - Deletes the user's account.

##
This README file should provide a clear and comprehensive guide for setting up and using your CineScope application. Feel free to customize and expand it as needed.


