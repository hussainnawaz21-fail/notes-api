// Controllers hold the actual logic for each route.
// Keeping this separate from routes.js keeps things organized,
// as suggested in the bonus requirements.

const store = require('../data/notesStore');

// GET /api/notes — retrieve all notes
function getAllNotes(req, res) {
  res.status(200).json({
    success: true,
    count: store.notes.length,
    data: store.notes,
  });
}

// GET /api/notes/:id — retrieve a single note
function getNoteById(req, res) {
  const id = Number(req.params.id);
  const note = store.notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: `Note with id ${id} not found`,
    });
  }

  res.status(200).json({ success: true, data: note });
}

// POST /api/notes — create a new note
function createNote(req, res) {
  const { title, content } = req.body;

  // Basic input validation (bonus requirement)
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Title is required and cannot be empty',
    });
  }

  const newNote = {
    id: store.getNextId(),
    title: title.trim(),
    content: content ? content.trim() : '',
    createdAt: new Date().toISOString(),
  };

  store.notes.push(newNote);

  res.status(201).json({ success: true, data: newNote });
}

// PUT /api/notes/:id — update an existing note
function updateNote(req, res) {
  const id = Number(req.params.id);
  const note = store.notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: `Note with id ${id} not found`,
    });
  }

  const { title, content } = req.body;

  // If a title is provided, it cannot be empty
  if (title !== undefined && title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Title cannot be empty',
    });
  }

  if (title !== undefined) note.title = title.trim();
  if (content !== undefined) note.content = content.trim();
  note.updatedAt = new Date().toISOString();

  res.status(200).json({ success: true, data: note });
}

// DELETE /api/notes/:id — remove a note
function deleteNote(req, res) {
  const id = Number(req.params.id);
  const index = store.notes.findIndex((n) => n.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Note with id ${id} not found`,
    });
  }

  const deleted = store.notes.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: 'Note deleted successfully',
    data: deleted,
  });
}

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
