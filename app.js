const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();

require('./utils/db');

var userList = [];
var user = {};

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

// app.get('/index', (req, res) => {
//     res.render('index', {
//         title: 'meow',
//         name: 'bunny'
//     });
// });

// app.get('/',(req,res) => {
//   res.sendfile("index.html");
// });

// app.post('/login', (req, res, next) => {
//     var userName = req.body.user;
//     var password = req.body.password;
// });

app.post('/register',(req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    user.username = username;
    user.password = password;
    userList.push(user);
    res.json({username, password});
    res.end("register complete");
});

app.get('/profile', (req, res) => {
    res.json(userList);
});

app.post('/login', (req, res) => {
    username = req.body.username;
    password = req.body.password;
    for (let i = 0; i < userList.length; i++){
        if (username == userList[i].username && password == userList[i].password){
            return res.json({username, password});
        } 
    }
    res.send('Your account is not exist');
});


// app.get('/profile', (req, res) => {
//     res.json({
//         user: username,
//         password: password
//     });
// });

// var userList = [{
//     "id": 1,
//     "username": "meow",
//     "password": "commonPassword"
// },
// {
//     "id": 2,
//     "username": "kophaimeo",
//     "password": "chacchackophaimeo"
// }];

// app.get('/allprofile', (req, res) => {
//     res.json({
//         data: userList,
//         message: "user profile"
//     })
// });