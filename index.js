
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./src/auth');
const articles = require('./src/articles');

const hello = (req, res) => res.send({ hello: 'world' });




const app = express();
app.use(bodyParser.json());
app.use(auth);
app.use(articles);
app.get('/', hello);



// Get the port from the environment, i.e., Heroku sets it
const port = 3000;
const server = app.listen(port, () => {
     const addr = server.address();
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
});