var express = require('express');

var mongoose = require('mongoose');
var cookieSession = require('cookie-session');
var passport = require('passport');

require('./User');
require('./passport');

mongoose.connect("mongodb://localhost/student_info");

var app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: ['sdfkjsdfksdklfj']
    })
);

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/42', passport.authenticate('42'));

app.get('/auth/42/callback',
    passport.authenticate('42'),
    (req, res) => {
        console.log("call back function here");
        res.redirect('/');
});

app.get('/', (req, res) => {
    res.end(`hahaha, congrats ${req}`);
})

app.get('/api/current_user', (req, res) => {
    res.send(req.user);
    // res.send(req.session);
});

app.listen(8000, () => {
    console.log('server started on port 8000');
})

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });

//http://localhost:8000/auth/42


