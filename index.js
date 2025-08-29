import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;
const standardURL = "https://covers.openlibrary.org/b/isbn/";
const searchURL = "https://openlibrary.org/search.json";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    password: "Postgres_55",
    database: "capstone db",
    port: 5432,
});
db.connect();

app.get("/", async (req, res) => {
  const result = await db.query("SELECT title, author, code FROM books order by id ASC");
  const bookTitle = result.rows[0].title;
  const bookAuthor = result.rows[0].author;
  const bookCode = result.rows[0].code;
  const imageURL = `${standardURL}${bookCode}-M.jpg`;

if (bookCode) {
  imageURL = `${URL}${bookCode}-M.jpg`;
} else if (bookCode === null) {
  await axios.get(`${searchURL}`)
}

    res.render("index.ejs", { title : bookTitle, author : bookAuthor, code : bookCode, image : imageURL });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});