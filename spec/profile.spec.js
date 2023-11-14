// require('es6-promise').polyfill();
// require('isomorphic-fetch');

// const url = path => `http://localhost:3000${path}`;

// describe('Validate Profile functionality', () => {
//     const loginUser = {
//         username: "testUser",
//         password: "123"
//     };

//     const newHeadline = "New headline";

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

//     it('/GET headline: fetch headline for a specific user', (done) => {
//         fetch(url(`/headline/${loginUser.username}`), {
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
//             expect(res.username).toEqual('testUser');
//             // expect(res.headline).toEqual('Default headline');
//             done();
//         }).catch(err => {
//             console.error('Error:', err);
//             done(err);
//         });
        
//     })

//     it('/PUT headline: change headline for a specific user', (done) => {
//         fetch(url(`/headline`), {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Cookie': sessionCookie
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify({ headline: newHeadline })
//             }) .then(res => {
//                 console.log('Status:', res.status);
//                 // console.log(res);
//                 expect(res.status).toBe(200);
//                 return res.json();
//             }).then(res => {
//                 console.log("ful response", res);
//                 expect(res.username).toEqual(loginUser.username);
//                 expect(res.headline).toEqual(newHeadline);
//                 done();
//             }).catch(err => {
//                 console.error('Error:', err);
//                 done(err);
//             });
//         })

//  });
    