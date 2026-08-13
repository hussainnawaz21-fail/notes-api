// Routes for /api/notes — kept separate from server.js as suggested
// in the bonus requirements, instead of one giant file.

const express = require('express');
const router = express.Router();

const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');

router.get('/', getAllNotes);       // GET    /api/notes
router.get('/:id', getNoteById);    // GET    /api/notes/:id
router.post('/', createNote);       // POST   /api/notes
router.put('/:id', updateNote);     // PUT    /api/notes/:id
router.delete('/:id', deleteNote);  // DELETE /api/notes/:id

module.exports = router;
