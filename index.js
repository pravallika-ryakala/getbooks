const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "goodreads.db");
let db = null;

const initializationAndDBServer = async () => {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at localhost");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializationAndDBServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
      SELECT 
        * 
      FROM 
        book 
      ORDER BY 
        book_id;
  `;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
