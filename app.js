const express = require('express')
const app = express()
const users = require('./users.json')
const bodyParser = require('body-parser')
const { response } = require('express')
const port = 3001
const setCookie = require('set-cookie-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//set cookie
app.get('/setcookie', (req, res) => {

    res.cookie("firstName", "Nick")
    res.send('The cookie was set')
})

//set cookie
app.get('/login', (req, res) => {

    res.cookie("name", "Nick")
    res.send('The login cookie was set')
})

//read cookie
app.get('/readcookie', (req, res) => {
    
    res.send(req.cookies.firstName)
})

app.get('/hello', (req, res) => {
    
    res.send(`The login cookie was set ${name}`)
})

app.get('/deletecookie', (req, res) => {
    res.clearCookie("firstName")
})


//posts all user data when using: http://localhost:3001/
app.get('/', (req, res, next) => {
    if (!req.query.name) res.send(users) 
    else {
        let firstName = req.query.name.split(/,/)[0].replace('[','').replace(']','')
        let lastName = req.query.name.split(/,/)[0].replace('[','').replace(']','')
        for (let i=0; i<users.length; i++) {
            if (users[i].name[0] == firstName && users[i].name[1] === lastName) {
                res.send(users[i]);
                return;
            }
        }
        res.send("No User Found!")
    }
})

app.get('/:id', (req, res) => {
    for (let i=0; i<users.length; i++) {
        if (users[i].id == req.params.id) {
            res.send(users[i]);
            return;
        }
    }
    res.send("No User Found!")
})


app.post('/', (req, res) => {
    res.send(users)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))