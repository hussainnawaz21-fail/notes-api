# Notes API

A RESTful Notes API built with **Node.js** and **Express.js**, supporting full CRUD (Create, Read, Update, Delete) functionality. Data is stored in memory for now — a real database will be added in a later assignment.

## Features

- `GET /api/notes` — retrieve all notes
- `GET /api/notes/:id` — retrieve a single note by id
- `POST /api/notes` — create a new note
- `PUT /api/notes/:id` — update an existing note
- `DELETE /api/notes/:id` — delete a note
- Input validation (rejects empty/missing titles)
- Proper HTTP status codes (`200`, `201`, `400`, `404`, `500`)
- Routes organized into a separate file (`routes/notes.js`) with logic in a controller (`controllers/notesController.js`), instead of one giant `server.js`
- Basic request logging and centralized error handling middleware

## Tech Stack

- Node.js
- Express.js
- In-memory data store (plain JS array)

## Project Structure

```
notes-api/
├── controllers/
│   └── notesController.js   # CRUD logic for notes
├── data/
│   └── notesStore.js        # In-memory "database"
├── routes/
│   └── notes.js              # Route definitions for /api/notes
├── server.js                 # App entry point / middleware setup
├── package.json
└── README.md
```

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/<your-username>/notes-api.git
   cd notes-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   Or, with auto-restart on file changes (requires nodemon, included as a dev dependency):
   ```bash
   npm run dev
   ```
4. The API will be running at `http://localhost:3000`

## API Reference

### Get all notes
```
GET /api/notes
```
**Response — 200 OK**
```json
{
  "success": true,
  "count": 1,
  "data": [
    { "id": 1, "title": "Welcome to the Notes API", "content": "...", "createdAt": "..." }
  ]
}
```

### Get a single note
```
GET /api/notes/:id
```
**Response — 200 OK** (or **404** if not found)

### Create a note
```
POST /api/notes
Content-Type: application/json

{
  "title": "Buy groceries",
  "content": "Milk, eggs, bread"
}
```
**Response — 201 Created**

`title` is required and cannot be empty — returns **400 Bad Request** otherwise.

### Update a note
```
PUT /api/notes/:id
Content-Type: application/json

{
  "title": "Updated title",
  "content": "Updated content"
}
```
**Response — 200 OK** (or **404** if the note doesn't exist, **400** if `title` is provided but empty)

### Delete a note
```
DELETE /api/notes/:id
```
**Response — 200 OK** (or **404** if not found)

## Testing with Postman

1. Open Postman and create a new request
2. Set the method (GET/POST/PUT/DELETE) and URL (e.g. `http://localhost:3000/api/notes`)
3. For POST/PUT requests: go to the **Body** tab → select **raw** → choose **JSON** → enter your note data
4. Click **Send** and check the response body and status code

You can also import these routes manually into a Postman Collection for repeated testing.

## Possible Future Improvements

- Connect to a real database (MongoDB / PostgreSQL) instead of in-memory storage
- Add authentication (e.g. JWT) so notes belong to specific users
- Add pagination and search/filtering on `GET /api/notes`
- Write automated tests (e.g. with Jest + Supertest)

## Author

Built by Hussain as part of a Week 3 internship task on Node.js and Express.js.
