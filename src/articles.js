const express = require('express');
const session = require('express-session');
const app = express.Router();
const mongoose = require('mongoose');
const userSchema = require('./userSchema');
const profileSchema = require('./profileSchema');
const articleSchema = require('./articleSchema');
const User = mongoose.model('user', userSchema);
const Profile = mongoose.model('profile', profileSchema);
const Article = mongoose.model('article', articleSchema);

app.get('/articles', async(req, res) => {
    const loggedInUser = req.session.user.username;
    const articles = await  Article.find({ author: loggedInUser });
    return res.json({ articles: articles });
});

app.get('/articles/:id?', async(req, res) => {
    const loggedInUser = req.session.user.username;
    
    if(req.params.id){
        const id = req.params.id;
        if(!isNaN(id)){
            const article = await Article.findOne({ pid: id });

            if(article){
                return res.json({ articles:[article]});
            } else {
                return res.status(404).send('Not found');
            }
        } else {
            const article = await Article.find({ author: id });

            if(article){
                return res.json({ articles:[article]});
            } else {
                return res.status(404).send('Not found');
            }
        }
    }
    else{
        const article = await Article.find({ author: loggedInUser });
        return res.json({ articles: article });
    }
});


app.post('/article', async (req, res) => {
    const loggedInUser = req.session.user.username;
    const { text } = req.body;
    const articleLength = await Article.countDocuments();
    const newArticle = { pid: articleLength, author: loggedInUser, body:text, comments: [], date: new Date()};
    const article = new Article(newArticle);
    await article.save();
    res.json({articles:[newArticle]});


});


module.exports = app;