// In-memory "database" for notes.
// This resets every time the server restarts — a real database
// (e.g. MongoDB/PostgreSQL) will replace this in a later assignment.

let notes = [
  {
    id: 1,
    title: 'Welcome to the Notes API',
    content: 'This is your first note. Try updating or deleting it!',
    createdAt: new Date().toISOString(),
  },
];

// Keeps track of the next id to assign (simple auto-increment).
let nextId = 2;

module.exports = {
  notes,
  getNextId: () => nextId++,
};
