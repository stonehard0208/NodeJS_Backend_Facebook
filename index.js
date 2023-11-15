const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const auth = require('./src/auth');
const profile = require('./src/profile');
const articles = require('./src/articles');
const following = require('./src/following');
// const connectionString = "mongodb+srv://comp531server:comp531serverpwd@cluster0.sutj4yv.mongodb.net/ricebook?retryWrites=true&w=majority";
const connectionString = "mongodb+srv://comp531server:comp531server@cluster0.sutj4yv.mongodb.net/ricebook?retryWrites=true&w=majority";

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


const hello = (req, res) => res.send({ hello: 'world' });


const app = express();
app.use(session({
    secret: 'secret',
    cookie: { secure: false, httpOnly: true },
    resave: false,
    saveUninitialized: true
}));

app.use(auth.router);
app.use(auth.isLoggedIn);
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/', hello);
app.use(profile);
app.use(following);
app.use(articles);

module.exports = app;
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
     const addr = server.address();
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
});