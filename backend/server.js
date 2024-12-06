const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { expressjwt: expressJWT } = require('express-jwt');
const cors = require('cors');
const bcrypt = require('bcryptjs')

const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://final-project-p75-frontend.onrender.com/'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});
app.use(express.json());
app.use(cors());

const PORT = 3000;

const secretKey = 'secretKey';
const jwtMw = expressJWT({
  secret: secretKey,
  algorithms: ['HS256'],
});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWD,
  database: process.env.DBNAME,
});

app.get('/api/summarydata', jwtMw, (req, res) => {
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

  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM users', function (err, rows) {
      connection.release();
      if (err) throw err;
      let users = JSON.stringify(rows);
      for (let user of JSON.parse(users)) {
        if (username == user.username) {
          const timeInSeconds = 1800;
          bcrypt.compare(password, user.password, async (err, isMatch) => {
            if (isMatch) {
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
          });
          break;
        } else {
          res.status(401).json({
            success: false,
            token: null,
            err: 'Username or password is incorrect',
          });
        }
      }
    });
  });
});

app.get('/api/dashboard', jwtMw, (req, res) => {
  res.json({
    success: true,
    myContent: 'Secret content that only logged in people can see',
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
