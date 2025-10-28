const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let books = [
  { id: 1, title: "Book One", author: "Author A" },
  { id: 2, title: "Book Two", author: "Author B" }
];

app.get("/", (req, res) => {
  res.send("📚 Book Library Backend is Running!");
});

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.post("/api/books", (req, res) => {
  const newBook = { id: Date.now(), ...req.body };
  books.push(newBook);
  res.json(newBook);
});

app.put("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  books = books.map((book) => (book.id === id ? { ...book, ...req.body } : book));
  res.json({ message: "Book updated successfully" });
});

app.delete("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter((book) => book.id !== id);
  res.json({ message: "Book deleted successfully" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

module.exports = app; // Important for Vercel!
