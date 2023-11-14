// require('es6-promise').polyfill();
// require('isomorphic-fetch');

// const url = path => `http://localhost:3000${path}`;

// describe('Validate Registration and Login functionality', () => {

//     it('/POST register: register new user', (done) => {
//         let regUser = {
//             username: "testUser",
//             email: "test@example.com",
//             dob: "01-01-1990",
//             phone: "1234567890",
//             zipcode: "12345",
//             password: "123",
//             headline: "Default headline",
//         };
//         fetch(url('/register'), {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(regUser)
//         }).then(res => res.json()).then(res => {
//             expect(res.username).toEqual('testUser');
//             expect(res.result).toEqual('success');
//             done();
//         });
//     });

//     it('/POST login: login user', (done) => {
//         let loginUser = {username: 'testUser', password: '123'};
//         fetch(url('/login'), {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(loginUser)
//         }).then(res => {
//             return res.json()
//         }).then(res => {
//             expect(res.username).toEqual('testUser');
//             expect(res.result).toEqual('success');
//             done();
//         });
//     });

//     it('/POST logout: log out user', (done) => {
//         fetch(url('/logout'), {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//         }).then(res => {
//             expect(res.status).toEqual(200);
//             done();
//         });
//     });

// });
