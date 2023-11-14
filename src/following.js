const express = require('express');
const session = require('express-session');
const app = express.Router();
const mongoose = require('mongoose');
const userSchema = require('./userSchema');
const profileSchema = require('./profileSchema');
const User = mongoose.model('user', userSchema);
const Profile = mongoose.model('profile', profileSchema);
app.use(session({
    secret: 'secret',
    cookie: { secure: false, httpOnly: true },
    resave: false,
    saveUninitialized: true
}));

app.get('/following/:user?', async(req, res) => {
    const username = req.params.user;
    const user = await Profile.findOne({ username: username });

    res.send({ username: username, following: user.following});
});

app.put('/following/:user', async(req, res) => {
    const username = req.params.user;
    const loggedInUser = req.session.user.username;
    const user = await Profile.findOne({ username: loggedInUser });
    user.following.push(username);
    user.save();
    
    res.send({ username: loggedInUser, following: user.following});
});

app.delete('/following/:user', async(req, res) => {
    const username = req.params.user;
    const loggedInUser = req.session.user.username;
    const user = await Profile.findOne({ username: loggedInUser });
    console.log(user.following, username);
    user.following = user.following.filter(user => user !== username);
    user.save();
    
    res.send({ username: loggedInUser, following: user.following});
});

module.exports = app;