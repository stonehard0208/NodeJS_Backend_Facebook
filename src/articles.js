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

app.get('/articles/:id?', async (req, res) => {
    const loggedInUser = req.session.user.username;

    if (req.params.id) {
        const id = req.params.id;

        try {
            const article = await Article.findOne({ pid: id });

            if (!article || article.author !== loggedInUser) {
                return res.status(404).send('Article not found or you do not have access to it');
            }

            return res.json({ articles: [article] });
        } catch (error) {
            return res.status(400).send('Invalid article ID');
        }
    } else {
        
        const articles = await Article.find({ author: loggedInUser });
        return res.json({ articles: articles });
    }
});




app.post('/article', async (req, res) => {
    try {
        const loggedInUser = req.session.user.username;
        const { text } = req.body;
        const articleLength = await Article.countDocuments();
        const newArticle = { pid: articleLength, author: loggedInUser, text: text, comments: [], date: new Date()};
        const article = new Article(newArticle);
        await article.save();
        const articles = await Article.find({ author: loggedInUser });
        res.json({articles: articles});
    } catch(error){
        res.status(500).json({ error: "Internal server error" });
    }
    


});


module.exports = app;