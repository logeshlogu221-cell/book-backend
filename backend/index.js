const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Temporary data store
let books = [
  { id: 1, title: "Book One", author: "Author One" },
  { id: 2, title: "Book Two", author: "Author Two" },
];

// GET all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// POST a new book
app.post("/api/books", (req, res) => {
  const newBook = { id: Date.now(), ...req.body };
  books.push(newBook);
  res.json(newBook);
});

// PUT (update) a book
app.put("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);
  if (index !== -1) {
    books[index] = { ...books[index], ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// DELETE a book
app.delete("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter((b) => b.id !== id);
  res.json({ message: "Book deleted" });
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
