const functions = require("firebase-functions");
const express = require('express');
const handlebars = require('express-handlebars')
const i18n = require('i18n');
const path = require('path');
var nodemailer = require('nodemailer');
const { app } = require("firebase-admin");

// **** Translation ****
i18n.configure({
    locales: ['es', 'en'],
    cookie: 'locale',
    directory: __dirname + '/locales',
    defaultLocale: 'en'
});


// **** Server configuration ****
const server = express();
server.use(i18n.init);
server.use(express.urlencoded({

    extended:false
}));
server.use(express.json());
server.use(require('./routes/index'));

server.use(express.static(path.join(__dirname, './public')));


// **** Handle bars configuration ****
const hbs = handlebars.create({
    defaultLayout: 'main',
    helpers: {
        __: function() {
            return i18n.__.apply(this, arguments);
        },
        __n: function() {
            return i18n.__n.apply(this, arguments);
        }
    }
})

server.engine('handlebars', hbs.engine);
server.enable('view cache');
server.set('view engine', 'handlebars');
server.set("views", "./views");

server.get('/', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.render('home');
});
server.get('/about', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.render('about');
});
server.get('/contact', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.render('contact');
});
server.get('/services', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.render('services');
});
server.get('/portfolio', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.render('portfolio');
});



server.post('/email',(req,res)=>{
    res.json({message:'message received!!'})
});

server.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname,'views','index'))
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.render('index');
});



exports.app = functions.https.onRequest(server);


 server.listen(3000, () => {
   console.log("Node.js app listening on port" + 3000 + ", environment: " + process.env.NODE_ENV)
 });