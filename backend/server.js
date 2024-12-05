const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { expressjwt: expressJWT } = require('express-jwt');
const cors = require('cors');


const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://final-project-p75-frontend.onrender.com/');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});
app.use(express.json());
app.use(cors());


// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'priya_project',
// });

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

const PORT = 3000;

const secretKey = 'secretKey';
const jwtMw = expressJWT({
  secret: secretKey,
  algorithms: ['HS256'],
});

let users = [
  {
    id: 1,
    username: 'priyanka',
    password: 'priyanka',
  },
];

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'sql5.freemysqlhosting.net',
  user: process.env.DBUSER,
  password: process.env.DBPASSWD,
  database: process.env.DBNAME,
});

app.get('/api/summarydata', jwtMw,(req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM summarytable', function (err, rows) {
      connection.release();
      if (err) throw err;
      res.send(JSON.stringify(rows));
    });
  });
});

app.get('/api/reportdata', jwtMw, (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM resultstable', function (err, rows) {
      connection.release();
      if (err) throw err;
      res.send(JSON.stringify(rows));
    });
  });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  for (let user of users) {
    if (username == user.username && password == user.password) {
      const timeInSeconds = 1800;
      let token = jwt.sign(
        { id: user.id, username: user.username },
        secretKey,
        { expiresIn: timeInSeconds }
      );
      res.json({
        success: true,
        err: null,
        token,
      });
    } else {
      res.status(401).json({
        success: false,
        token: null,
        err: 'Username or password is incorrect',
      });
    }
  }
});

app.get('/api/dashboard', jwtMw, (req, res) => {
  res.json({
    success: true,
    myContent: 'Secret content that only logged in people can see',
  });
});

app.get('/api/settings', jwtMw, (req, res) => {
  res.json({
    success: true,
    myContent: 'Settings page',
  });
});

app.get('/api/prices', jwtMw, (req, res) => {
  res.json({
    success: true,
    myContent: 'This is the price $3.99',
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      success: false,
      officialError: err,
      err: 'Username or password is incorrect 2',
    });
  } else {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`serving on port ${PORT}`);
});
