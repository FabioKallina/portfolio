
# API Documentation for Notes Management

## Overview

This application utilizes **Express.js** for routing, **MongoDB** for data storage, and **Auth0** for authentication via OpenID Connect. It provides both RESTful API endpoints and server-side rendered pages using **EJS** for templating.

## Environment Setup

Environment variables are loaded from `.env` using **dotenv**. The server listens on the port defined by `PORT` in the environment or defaults to `3000`.

## Middleware

- **Morgan**: Logs HTTP requests in development mode.
- **Express JSON & URL-Encoded**: Parses incoming requests with JSON and URL-encoded payloads.
- **Method Override**: Allows HTTP methods to be overridden with an `_method` field in POST requests.
- **Static Files**: Serves static files from the `public` directory.
- **Favicon**: Serves a custom favicon from `public/scrollApp.png`.
- **Authentication**: Uses **express-openid-connect** for Auth0 authentication.

## Authentication Configuration

- **authRequired**: `false` by default, meaning routes can be accessed without authentication unless specified otherwise.
- **auth0Logout**, **secret**, **baseURL**, **clientID**, and **issuerBaseURL** are configured via environment variables.

## Routes

### Main Routes

- **GET /**: Renders the index page, checking if the user is authenticated.
- **GET /notes/new**: Renders a view for creating a new note.
- **GET /profile**: Requires authentication. Fetches and renders the user's notes for the profile page.
- **GET /notes**: Requires authentication. Fetches and renders all notes for the user.

### API Routes

#### **GET /notes**
- **Description**: Retrieves all notes for the authenticated user.
- **Request**:
  - Headers: `Authorization` (handled by OpenID Connect)
- **Response**:
  - Success (200): Renders the 'notes' view displaying the note objects.
  - Error (500): JSON response with error details:
    ```json
    {
      "status": "error",
      "message": "Failed to fetch notes",
      "error": "Error message here"
    }
    ```

#### **GET /notes/:id**
- **Description**: Retrieves a specific note by its ID for the authenticated user.
- **Request**:
  - Parameters: `id` (string) - ID of the note
- **Response**:
  - Success (200): Renders the 'note-editor' view with the note object.
  - Error (404): "Note not found" if the note doesn't exist or the user doesn't have access.
  - Error (500): JSON response with error details.

#### **POST /notes**
- **Description**: Creates a new note for the authenticated user.
- **Request**:
  - Body:
    ```json
    {
      "text": "string",
      "title": "string"
    }
    ```
- **Response**:
  - Success (302): Redirects to `/notes` after note creation.
  - Error (400): JSON response if note creation fails.

#### **PUT /notes/:id**
- **Description**: Updates an existing note.
- **Request**:
  - Parameters: `id` (string) - ID of the note to update
  - Body:
    ```json
    {
      "text": "string",
      "title": "string"
    }
    ```
- **Response**:
  - Success (200): JSON response indicating successful update.
  - Error (404): JSON response if note not found or user lacks permission.
  - Error (400): JSON response if update fails.

#### **DELETE /notes/:id**
- **Description**: Deletes a note.
- **Request**:
  - Parameters: `id` (string) - ID of the note to delete
- **Response**:
  - Success (302): Redirects to `/notes` after deletion.
  - Error (404): JSON response if note not found or user lacks permission.
  - Error (500): JSON response if deletion fails.

## Notes

The `createdBy` field in MongoDB documents is used to ensure that users can only access or modify their own notes, using `req.oidc.user.sub`.

## Dependencies

- **MongoDB** for data storage
- **Express.js** for routing
- **OpenID Connect** for authentication
- **EJS** for templating

## Error Handling

A global error handler catches any errors that occur during request processing, logs them, and sends a JSON response with an error message.

## Database

The application connects to MongoDB using the `connectDB()` function from `config/db.js`.

## Frontend

The application uses **EJS** for rendering views, with views stored in the `views` directory.

## Additional Notes

- All routes that interact with user-specific data (like notes) check the `createdBy` field to ensure users only access their own data, using `req.oidc.user.sub` from Auth0's session.

## Author

Developed by **Fabio Kallina de Paula**.
