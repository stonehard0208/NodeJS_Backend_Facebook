const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const session = require('express-session');
const users = [];

router.use(bodyParser.json());
router.use(session({
    secret: 'AAAA',
    cookie: { secure: true },
    resave: false,
    saveUninitialized: false
}));

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        req.session.username = username;
        req.session.authenticated = true;

        res.json({ username: username, result: 'success'});
    } else {
        res.status(401).json({ result: 'failure'});
    }

});


router.put('/logout', (req, res) => {
    req.session.destroy(() => {
        res.sendStatus(200);
    });
    

});


router.post('./register', (req, res) => {
    const { username, email, dob, phone, zipcode, password } = req.body;
    if(username && email && dob && phone && zipcode && password){
        res.json({ resule: 'success', username: username });
    }
    else{
        res.status(401).json({ result: 'failure'});
    }
});

router.put('/password', (req, res) => {
    const loggedInUser = req.session.username;
    const { password } = req.body;
    const user = users.find(user => user.username === loggedInUser);
    user.password = password;

    res.send({ username: loggedInUser, result: "success"});

});

module.exports = router;