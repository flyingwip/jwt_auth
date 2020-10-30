// main starting point of the application

const express = require('express')
const Sequelize = require('sequelize');
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const session_db = new Sequelize('', '', '', {
    dialect: 'sqlite',
    storage: './database.sqlite3',
    logging: false
});

app.use(session({
    secret: 'NjEwZGJiNzcwNzc0ZDcwNjdlZDYyNWY3',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: session_db
    })
}));
session_db.sync();

// App Setup
// add some middleware
app.use(morgan('combined'))
app.use(bodyParser.json({type:'*/*'}))
router(app)

// Server Setup
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on :', port)

