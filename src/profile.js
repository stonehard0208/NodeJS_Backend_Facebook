const express = require('express');
const app = express.Router();
const users = [
    {username: 'RDesRoches',
    headline: 'This is my headline!',
    email: 'foo@bar.com',
    zipcode: 12345,
    phone: '123-456-7890',
    dob: '128999122000',
    avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'}
];

app.get('/headline/:user?', (req, res) => {
    const username = req.params.user;
    const user = users.find(user => user.username === username);

    res.send({ username: username, headline: user.headline});
})

app.put('/headline', (req, res) => {
    const headline = req.body.headline;
    const loggedInUser = req.session.username;

    const user = users.find(user => user.username === loggedInUser);
    user.headline = headline;
    res.send({ username: loggedInUser, headline: headline});
});

app.get('/email/:user?', (req, res) => {
    const username = req.params.user;
    const user = users.find(user => user.username === username);

    res.send({ username: username, email: user.email});
})

app.put('/email', (req, res) => {
    const email = req.body.email;
    const loggedInUser = req.session.username;

    const user = users.find(user => user.username === loggedInUser);
    user.email = email;
    res.send({ username: loggedInUser, email: email});
});

app.get('/zipcode/:user?', (req, res) => {
    const username = req.params.user;
    const user = users.find(user => user.username === username);

    res.send({ username: username, zipcode: user.zipcode});
})

app.put('/zipcode', (req, res) => {
    const newZipCode = req.body.zipcode;
    const loggedInUser = req.session.username;

    const user = users.find(user => user.username === loggedInUser);
    user.zipcode = newZipCode;
    res.send({ username: loggedInUser, zipcode: newZipCode});
});

app.get('/dob:user?', (req, res) => {
    const username = req.params.user;
    
    const user = users.find(user => user.username === username);
    res.send({ username: username, dob: user.dob});
});

app.get('/avatars/:user?', (req, res) => {
    const username = req.params.user;
    const user = users.find(user => user.username === username);

    res.send({ username: username, avatar: user.avatar});
});

app.put('/avatar', (req, res) => {
    const avatar = req.body.avatar;
    const loggedInUser = req.session.username;

    const user = users.find(user => user.username === loggedInUser);
    user.avatar = avatar;
    res.send({ username: loggedInUser, avatar: avatar});
});

app.get('/phone/:user?', (req, res) => {
    const username = req.params.user;
    const user = users.find(user => user.username === username);

    res.send({ username: username, phone: user.phone});
});

app.put('/phone', (req, res) => {
    const phone = req.body.phone;
    const loggedInUser = req.session.username;

    const user = users.find(user => user.username === loggedInUser);
    user.phone = phone;
    res.send({ username: loggedInUser, phone: phone});
});

module.exports = app;