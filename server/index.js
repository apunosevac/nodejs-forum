const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require('mysql');
const PORT = 8080;
var date = new Date().toISOString().split('T')[0]; // convert date to match the MySQL date format YYYY-MM-DD

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "paranormal_forum"
});

con.connect(function(err) {
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

app.post('/registerUser', (req, res)=> {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const dateString = toString(date);
    
    con.execute(
      "INSERT INTO users (username, email, pass, date_created, date_online) VALUES (?,?,?,?,?)",
      [username, email, password, dateString, dateString],
      (err, result)=> {
      console.log(err);
      console.log(result);
      }
    );
 });

 app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    con.execute(
        "SELECT * FROM users WHERE email = ? AND pass = ?",
        [email, password],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
    
            if (result.length > 0) {
                res.send(result);
                res.json({
                  message: "Login successfully",
                  id: result[0].user_id,
              });
            }
            else({message: "Wrong email/password comination!"});
        }
    );
});