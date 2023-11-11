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


app.get('/following/:user?', (req, res) => {
    const username = req.params.user;
    const user = users.find(user => user.username === username);

    res.send({ username: username, following: user.following});
});

app.put('/following/:user', (req, res) => {
    const username = req.params.user;
    const loggedInUser = req.session.username;
    const user = users.find(user => user.username === loggedInUser);
    user.following.push(username);
    
    res.send({ username: loggedInUser, following: loggedInUser.following});
});

app.delete('/following/:user', (req, res) => {
    const username = req.params.user;
    const loggedInUser = req.session.username;
    const user = users.find(user => user.username === loggedInUser);
    user.following = user.following.filter(user => user.username !== username);
    
    res.send({ username: loggedInUser, following: user.following});
});

module.exports = app;