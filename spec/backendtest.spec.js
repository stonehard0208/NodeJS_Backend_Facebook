require('es6-promise').polyfill();
require('isomorphic-fetch');
const { JUnitXmlReporter } = require('jasmine-reporters');
// Setup the reporter
jasmine.getEnv().addReporter(new JUnitXmlReporter({
    savePath: './test-results', // Directory to save the reports
    consolidateAll: true // Consolidate each suite's report into one file, with False it makes 1 report per each spec file
}));

const url = path => `http://localhost:3000${path}`;

describe('Backend tests', () => {

    let sessionCookie;
    const newArticle = "New article!";
    let initialLength;

    it('/POST register: register new user', (done) => {
        let regUser = {
            username: "testUser",
            email: "test@example.com",
            dob: "01-01-1990",
            phone: "1234567890",
            zipcode: "12345",
            password: "123",
            headline: "Default headline",
        };
        fetch(url('/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regUser)
        }).then(res => res.json()).then(res => {
            expect(res.username).toEqual('testUser');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('/POST login: login user', (done) => {
        let loginUser = {username: 'testUser', password: '123'};
        fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginUser)
        }).then(res => {
            sessionCookie = res.headers.get('Set-Cookie'); 
            return res.json()
        }).then(res => {
            expect(res.username).toEqual('testUser');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('/POST articles: upload a new article', (done) => {
        fetch(url(`/articles`), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': sessionCookie
            },
            credentials: 'include',
        }).then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
            initialLength = res.articles[res.articles.length - 1].pid;
        })
        fetch(url(`/article`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': sessionCookie
                },
                credentials: 'include',
                body: JSON.stringify({ text: newArticle })
            }) .then(res => {
                expect(res.status).toBe(200);
                return res.json();
            }).then(res => {
                expect(res.articles).toBeDefined();
                // console.log(res.articles);
                // console.log(JSON.stringify(res.articles));
                expect(res.articles[0].pid).toEqual(initialLength + 1);
                expect(res.articles[0].text).toEqual(newArticle);
                done();
            }).catch(err => {
                console.error('Error:', err);
                done(err);
            });
        })

        it('/GET articles: fetch articles for a specific user', (done) => {
            const loginUser = {
                username: "testUser",
                password: "123"
            };
            fetch(url(`/articles/${loginUser.username}`), {
                method: 'GET',
                headers: {
                    'Cookie': sessionCookie
                },
                credentials: 'include'
            }) .then(res => {
                console.log('Status:', res.status);
                expect(res.status).toBe(200);
                return res.json();
            }).then(res => {
                // console.log("res", JSON.stringify(res.articles));
                expect(res.articles).toBeDefined();
                expect(res.articles[0][0].author).toEqual(loginUser.username);
                done();
            }).catch(err => {
                console.error('Error:', err);
                done(err);
            });
            
        })

        it('/POST logout: log out user', (done) => {
            fetch(url('/logout'), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            }).then(res => {
                expect(res.status).toEqual(200);
                done();
            });
        });

});
