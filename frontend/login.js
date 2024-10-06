const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({path: './.env'});
const app = express();

// Define Routes
app.use('/', require('./routes/pages'));

//importing mysql
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, // server, since its running locally so local host
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE   
});
const publicDirectory = path.join(__dirname, './public') // this directory includes all css, js files
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON budles (as sent by the API)
app.use(express.json());

//define authentication routes after middleware: 
// Define Authentication Routes
app.use('/auth', require('./routes/auth'));

app.set("view engine", 'hbs'); // setting the html

db.connect( (error) => {
    if(error) {
        console.log(error)
    }else{
        console.log("MYSQL Connected")
    }
})

app.listen(5001, () => {
    console.log("Server started on Port 5001")
});