const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({path: './.env'});

const app = express();
app.get("/", (req, res) => {
    //res.send("<h1> Login form page") // res is used to send data to the frontend of an application
    res.render("index");
});

// route for registration page
app.get("/register", (req, res) => {
    res.render("register");
});

/*
importing mysql
*/

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, // server, since its running locally so local host
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE   
});

const publicDirectory = path.join(__dirname, './public') // this directory includes all css, js files
app.use(express.static(publicDirectory));

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