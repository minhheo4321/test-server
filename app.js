const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

require('./utils/db/index');

const loadJson = require('./user.json');
var userList = loadJson.userList;
var currentUser = {};
// var user = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

console.log(__dirname);
console.log(path.join(__dirname, './public'));

const pathDir = path.join(__dirname, './public');

app.set('view engine', 'hbs');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static(pathDir));
app.listen(port, () => {
  console.log('Server running at ' + port);
});

app.get('/home', (req, res) => {
  res.send('Homepage');
});

// console.log(userList[0]);

// app.get('/index', (req, res) => {
//     res.render('index', {
//         title: 'meow',
//         name: 'bunny'
//     });
// });

// app.get('/',(req,res) => {
//   res.sendfile("index.html");
// });

app.post('/register', (req, res) => {
  // TODO: handle if req.body.username or password is undefined
  var username = req.body.username;
  var password = req.body.password;
  let user = {};
  user.username = username;
  user.password = password;
  userList.push(user);
  writeJson = JSON.stringify({ userList });
  fs.writeFile("user.json", writeJson, 'utf8', (err) => {
    if (err) {
      console.log("error writing json");
      // TODO: Don't return console.log()
      return console.log(err);
    }
    console.log("register succeed");
  });
  res.json({ username, password });
  res.end();
});

app.get('/profile', (req, res) => {
  res.json(userList);
});

app.post('/login', (req, res) => {
  username = req.body.username;
  password = req.body.password;
  for (let i = 0; i < userList.length; i++) {
    if (username == userList[i].username) {
      if (password != userList[i].password) {
        return res.send('Wrong password');
      } else {
        currentUser.username = username;
        currentUser.password = password;
        return res.json(currentUser);
      }
    }
  }
  res.send('Your account is not exist');
});

app.delete('/delete', (req, res) => {
  // correct flow
  res.json(currentUser);
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].username == currentUser.username && userList[i].password == currentUser.password) {
      userList.splice(i, 1);
      writeJson = JSON.stringify({ userList });
      fs.writeFile("user.json", writeJson, 'utf8', (err) => {
        if (err) {
          console.log("error writing json");
          return console.log(err);
        }
        console.log("delete succeed");
      });
      // return res.send('account deleted');
    }
  }
  // return res.send('no user to delete');
});

// writeJson = JSON.stringify({ userList });
// fs.writeFile("user.json", writeJson, 'utf8', (err) => {
//   if (err) {
//     console.log("error writing json");
//     return console.log(err);
//   }
//   console.log("write succeed");
// });

console.log(userList);

// return res.json({username, password});

// app.get('/profile', (req, res) => {
//     res.json({
//         user: username,
//         password: password
//     });
// });

app.put('/update', (req, res) => {
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].username == currentUser.username && userList[i].password == currentUser.password) {
      userList[i].username = currentUser.username = req.body.username;
      userList[i].password = currentUser.password = req.body.password;
      writeJson = JSON.stringify({ userList });
      fs.writeFile("user.json", writeJson, 'utf8', (err) => {
        if (err) {
          console.log("error writing json");
          return console.log(err);
        }
        console.log("update succeed");
      });
      return res.send("account update succeed");
    }
  }
  return res.send("account update fail");
});
