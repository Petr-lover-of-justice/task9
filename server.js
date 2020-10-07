const express = require("express");
var bodyParser = require("body-parser");

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const url = `mongodb+srv://task65:task65@cluster0.3vv5t.mongodb.net/cat?retryWrites=true&w=majority`;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
let books = [];
  const authorSchema = new mongoose.Schema({
  name: String,
});
const booksSchema = new mongoose.Schema({
  title: String,
  author:String,
  data:Number,
});
const Author = mongoose.model("Author", authorSchema);
const Books = mongoose.model("Books", booksSchema);
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api2/getAllBooks", function (req, res) {
  res.send(books);
});

app.get("/getAuthor", (req, res) => {
  Author.find({}).then((cat) => {
    res.json(cat);
  });
});
app.get("/getAuthor/:id", (request, response) => {
  Author.findById(request.params.id).then((test) => {
    response.json(test);
  });
});

app.patch("/api2/updateBook/:id", function (req, res) {
  let updateBook = books[req.params.id] || res.send("book not found!");
  updateBook.name = req.body.name;
  updateBook.year = req.body.year;
  res.send("book updated!");
});

app.post("/api2/saveBook", function (req, res) {
  books.push({
    name: req.body.name,
    year: req.body.year,
    id: books.length,
  });
  console.log(books);
  res.send("book saved!");
});
app.post("/api/saveAuthor", (request, response) => {
  const body = request.body;
  const author = new Author ({
    name: body.name,
  });
  author.save().then((savedAuthor) => {
    response.json(savedAuthor);
  });
});
  
app.delete("/api2/deleteBooks/:id", function (req, res) { 
  
    books.splice(req.params.id, 1);
    res.send("book deleted!");
  }
);

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
}


)
