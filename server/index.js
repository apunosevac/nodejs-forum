const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require('mysql');
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const PORT = 8080;
var date = new Date().toISOString().split('T')[0]; // convert date to match the MySQL date format YYYY-MM-DD

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "paranormal_forum"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database! Date: " + date);
});

app.listen(PORT, () => {
  console.log("Listening to server!");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.json('Hello, this is backend');
});

app.get('/users', (req, res) => {
  const query = "SELECT * FROM users";
  con.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/api/registerUser', (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.pass;

  var query = "INSERT INTO users (username, email, pass, date_created, date_online) VALUES (?)";
  var values = [username, email, password, date, date];

  con.query(`SELECT * FROM USERS WHERE email = "${email}" AND pass = "${password}"`, function (err, row) {
    if (err) {
      console.log('Error in DB');
      return;
    } else {
      if (row && row.length) {
        console.log('User already exists!');
      } else {
        con.query(query, [values], (err, data) => {
          if (err) return res.json(err);
          return res.json(data);
        });
      }
    }
  });
});

app.post('/api/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.pass;

  const query = `SELECT * FROM USERS WHERE email = "${email}" AND pass = "${password}"`;
  const values = [email, password];

  con.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });

});