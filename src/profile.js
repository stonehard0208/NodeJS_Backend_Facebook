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

app.get('/headline/:user?', async(req, res) => {
    const username = req.params.user;
    const user = await Profile.findOne({ username: username });
    if (!user) {
        return res.status(401).json({ result: 'User not found'});
    }


    res.send({ username: username, headline: user.headline});
})

app.put('/headline', async(req, res) => {
    const headline = req.body.headline;
    const loggedInUser = req.session.user.username;
    console.log("session",req.session);
    console.log("loggedinuser",loggedInUser);

    const user = await Profile.findOne({ username: loggedInUser });
    if (!user) {
        return res.status(401).json({ result: 'User not found'});
    }
    console.log({ username: loggedInUser, headline: headline});
    user.headline = headline;
    await user.save();
    res.send({ username: loggedInUser, headline: headline});
});

app.get('/email/:user?', async(req, res) => {
    const username = req.params.user;
    const user = await Profile.findOne({ username: username });
    if (!user) {
        return res.status(401).json({ result: 'User not found'});
    }

    res.send({ username: username, email: user.email});
})

app.put('/email', async(req, res) => {
    const email = req.body.email;
    const loggedInUser = req.session.user.username;

    const user = await Profile.findOne({ username: loggedInUser });
    if (!user) {
        return res.status(401).json({ result: 'User not found'});
    }

    user.email = email;
    await user.save();
    res.send({ username: loggedInUser, email: email});
});

app.get('/zipcode/:user?',async(req, res) => {
    const username = req.params.user;
    const user = await Profile.findOne({ username: username });
    if (!user) {
        return res.status(401).json({ result: 'User not found'});
    }

    
    res.send({ username: username, zipcode: user.zipcode});
})

app.put('/zipcode', async(req, res) => {
    const newZipCode = req.body.zipcode;
    const loggedInUser = req.session.user.username;

    const user = await Profile.findOne({ username: loggedInUser });
    if (!user) {
        return res.status(401).json({ result: 'User not found'});
    }

    user.zipcode = newZipCode;
    await user.save();
    res.send({ username: loggedInUser, zipcode: newZipCode});
});

app.get('/dob/:user?',async(req, res) => {
    const username = req.params.user;
    
    const user = await Profile.findOne({ username: username });
    if (!user) {
        return res.status(401).json({ result: 'User not found'});
    }

    res.send({ username: username, dob: user.dob});
});

app.get('/avatar/:user?', async(req, res) => {
    const username = req.params.user;
    const user = await Profile.findOne({ username: username });
    if (!user) {
        return res.status(401).json({ result: 'User not found'});
    }


    res.send({ username: username, avatar: user.avatar});
});

app.put('/avatar', async(req, res) => {
    const avatar = req.body.avatar;
    const loggedInUser = req.session.user.username;

    const user = await Profile.findOne({ username: loggedInUser });
    if (!user) {
        return res.status(401).json({ result: 'User not found'});
    }

    user.avatar = avatar;
    await user.save();
    res.send({ username: loggedInUser, avatar: avatar});
});

app.get('/phone/:user?', async(req, res) => {
    const username = req.params.user;
    const user = await Profile.findOne({ username: username });
    if (!user) {
        return res.status(401).json({ result: 'User not found'});
    }


    res.send({ username: username, phone: user.phone});
});

app.put('/phone', async(req, res) => {
    const phone = req.body.phone;
    const loggedInUser = req.session.user.username;

    const user = await Profile.findOne({ username: loggedInUser });
    if (!user) {
        return res.status(401).json({ result: 'User not found'});
    }

    user.phone = phone;
    await user.save();
    res.send({ username: loggedInUser, phone: phone});
});

module.exports = app;