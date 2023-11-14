// require('es6-promise').polyfill();
// require('isomorphic-fetch');

// const url = path => `http://localhost:3000${path}`;

// describe('Validate Articles functionality', () => {
//     const loginUser = {
//         username: "testUser",
//         password: "123"
//     };

//     const pid = 2;
//     const invalidPid = 100;
//     const newArticle = "New article!";
//     const initialID = 7;

//     beforeAll(done => {

//         fetch(url('/login'), {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(loginUser),
//             credentials: 'include'  
//         })
//         .then(response => {
//             sessionCookie = response.headers.get('Set-Cookie'); 
//             done();
//         })
//         .catch(err => {
//             console.error('Login Error:', err);
//             done(err);
//         });
//     });

//     it('/GET articles: fetch articles for a specific user', (done) => {
//         fetch(url(`/articles/${loginUser.username}`), {
//             method: 'GET',
//             headers: {
//                 'Cookie': sessionCookie
//             },
//             credentials: 'include'
//         }) .then(res => {
//             console.log('Status:', res.status);
//             expect(res.status).toBe(200);
//             return res.json();
//         }).then(res => {
//             // console.log("res", JSON.stringify(res.articles));
//             expect(res.articles).toBeDefined();
//             expect(res.articles[0][0].author).toEqual(loginUser.username);
//             done();
//         }).catch(err => {
//             console.error('Error:', err);
//             done(err);
//         });
        
//     })

//     it('/GET articles/id: fetch article by valid id', (done) => {
//         fetch(url(`/articles/${pid}`), {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Cookie': sessionCookie
//                 },
//                 credentials: 'include',
//             }) .then(res => {
//                 expect(res.status).toBe(200);
//                 return res.json();
//             }).then(res => {
//                 expect(res.articles).toBeDefined();
//                 expect(res.articles[0].author).toEqual(loginUser.username);
//                 done();
//             }).catch(err => {
//                 console.error('Error:', err);
//                 done(err);
//             });
//         })


//     it('/GET articles/id: fetch article by invalid id', (done) => {
//         fetch(url(`/articles/${invalidPid}`), {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Cookie': sessionCookie
//                 },
//                 credentials: 'include',
//             }) .then(res => {
//                 expect(res.status).toBe(404);
//                 done();
//             })
//         })
    

//     it('/POST articles: upload a new article', (done) => {
//         fetch(url(`/article`), {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Cookie': sessionCookie
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify({ text: newArticle})
//             }) .then(res => {
//                 expect(res.status).toBe(200);
//                 return res.json();
//             }).then(res => {
//                 expect(res.articles).toBeDefined();
//                 expect(res.articles[0].pid).toEqual(initialID + 1);
//                 expect(res.articles[0].body).toEqual(newArticle);
//                 done();
//             }).catch(err => {
//                 console.error('Error:', err);
//                 done(err);
//             });
//         })
    

//  });
    
