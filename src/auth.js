const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bodyParser = require('body-parser');
const router = express.Router();
const session = require('express-session');
const mongoose = require('mongoose');
const userSchema = require('./userSchema');
const profileSchema = require('./profileSchema');
const User = mongoose.model('user', userSchema);
const Profile = mongoose.model('profile', profileSchema);
const md5 = require('md5');


router.use(bodyParser.json());
router.use(session({
    secret: 'secret',
    cookie: { secure: false, httpOnly: true },
    resave: false,
    saveUninitialized: true
}));

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).json({ result: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.hash);
        if (!isMatch) {
            return res.status(401).json({ result: 'Password does not match'});
        }

        const sessionKey = md5('secret' + new Date().getTime() + user.username);
        req.session.user = { username: user.username, sessionKey: sessionKey };
        res.json({ username: username, result: 'success'});
        console.log(res.getHeaders());
    }
    catch(err){
        res.status(401).json({ result: 'failure'});
    }

});


router.put('/logout', (req, res) => {
    req.session.destroy(() => {
        res.sendStatus(200);
    });

});


router.post('/register', async (req, res) => {
    const { username, email, dob, phone, zipcode, password } = req.body;
    if(username && email && dob && phone && zipcode && password){
        try{
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = new User({
                username: username,
                salt,
                hash
            });
            await newUser.save();

            const newProfile = new Profile({
                username: username,
                headline: "Default headline",
                email: email,
                dob: dob,
                phone: phone,
                zipcode: zipcode,
                
            });
            await newProfile.save();
            res.json({ result: 'success', username: username });
        } catch(error){
            res.status(500).send({ error: error.message });
        }
        
    }
    else{
        res.status(401).json({ result: 'failure'});
    }
});




router.put('/password', async(req, res) => {
    const loggedInUser = req.session.user.username;
    const { password } = req.body;
    const user = await User.findOne({ username: loggedInUser });
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    user.salt = salt;
    user.hash = hash;
    await user.save();

    res.send({ username: loggedInUser, result: "success"});

});

function isLoggedIn (req, res, next){
    if (req.session.user && req.session.user.username) {
        return next();
    } else {
        res.status(401).send({ result: 'Log in first'});
    }
}


module.exports = { router, isLoggedIn } ;