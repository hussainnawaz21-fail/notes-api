const express = require('express');
const notesRoutes = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Simple request logger middleware (nice to have for debugging in Postman)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Root route — quick sanity check that the API is running
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Notes API is running 🚀',
    endpoints: {
      getAllNotes: 'GET /api/notes',
      getNoteById: 'GET /api/notes/:id',
      createNote: 'POST /api/notes',
      updateNote: 'PUT /api/notes/:id',
      deleteNote: 'DELETE /api/notes/:id',
    },
  });
});

// Mount the notes routes under /api/notes
app.use('/api/notes', notesRoutes);

// Catch-all 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Basic error-handling middleware (catches unexpected errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
  });
});

app.listen(PORT, () => {
  console.log(`Notes API server running on http://localhost:${PORT}`);
});
