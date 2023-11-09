const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const users = [];
app.use(bodyParser.json());

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