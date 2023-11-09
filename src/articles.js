const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let articles = [{ id: 0, author: 'Mack', body: 'Post 1', comments:[] },
    { id: 1, author: 'Jack', body: 'Post 2', comments:[] },
    { id: 2, author: 'Zack', body: 'Post 3', comments:[] }];


app.get('/articles/:id?', (req, res) => {
    const loggedInUser = req.session.username;
    // if (!loggedInUser) {
    //     return res.status(401).json({ error: 'You must be logged in to view articles' });
    // }


    if(req.params.id){
        const id = req.params.id;
        if(!isNaN(id)){
            const article = articles.find(article => article.id === parseInt(id));

            if(article){
                return res.json({ articles:[article]});
            } else {
                return res.status(404).send('Not found');
            }
        } else {
            const article = articles.filter(article => article.author === id);

            if(article){
                return res.json({ articles:[article]});
            } else {
                return res.status(404).send('Not found');
            }
        }
    }
    else{
        const article = articles.filter(article => article.author === loggedInUser);
        return res.json({ articles: article });
    }
});


app.put('/articles/:id', (req, res) => {
    const loggedInUser = req.session.username;
    const { text, commentId } = req.body;
    const id = req.params.id;

    const article = articles.find(article => article.id === parseInt(id));
    if(!article){
        return res.status(404).send('Article not found');
    }

    if(article.author !== loggedInUser){
        return res.status(403).send('Not owned by user');
    }

    if(typeof commentId !== undefined){
        if (commentId === -1){
            const newComment = { id: article.comments.length, author: loggedInUser, text: text };
            article.comments.push(newComment);
        } else {
            const comment = article.comments.find(comment => comment.id === parseInt(commentId));
            if(!comment){
                return res.status(404).send('Comment not found');
            }
            if(comment.author !== loggedInUser){
                return res.status(403).send('Not owned by user');
            }
            comment.text = text;
        }
    } else {
        article.body = text;
    }

    return res.json({articles:[article]});
});

app.post('/article', (req, res) => {
    const loggedInUser = req.session.username;
    const { text } = req.body;
    const newArticle = { id: articles.length, author: loggedInUser, body:text, comments: [], date: new Date()};
    articles.push(newArticle);
    return res.json({articles:[newArticle]});


});


module.exports = app;