const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysql = require("mysql");
const user = require('./routes/user');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'thien'
});

global.db = connection;

const app = express();
// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'capoo cat',
    resave: false,
    saveUninitialized: true,
    //cookie: { maxAge: 10000 }
}))
//
app.get('/', user.index);
app.post('/login', user.login);
app.post('/signup', user.signup);
app.get('/home', user.home);
app.get('/logout', user.logout);

// Listen at port 8080
app.listen(process.env.PORT || 8080, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});