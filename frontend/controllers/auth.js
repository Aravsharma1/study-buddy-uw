// add the connection here, connection for database is: 
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, // server, since its running locally so local host
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE   
});

exports.register = (req,res) => {
    console.log(req.body);
    // new variable
    const { name, email, password, passwordConfirm } = req.body; // destructring in javascript

    // querying into database:

    // step 1: import database:
    db.query('SELECT email_id FROM users WHERE email_id = ?', [email], async(error, results) => {
        if(error){
            //console.log("hello honey");
            console.log(error);
        }
        if(results.length > 0){
            return res.render('register', {
                message: 'Please choose a new email, it has already been used.'
            }) // stops the program when there is an email already been used
        }else if(password != passwordConfirm){
            return res.render('register', {
                message: 'Passwords entered do not match.'
            });
        }
        let hashedPassword = await bcrypt.hash(password, 8); // 8 is a secure number
        console.log(hashedPassword);

        // sending the data to the db 
        db.query("INSERT INTO users SET ?", {name: name, email_id : email, password : hashedPassword}, (error, results) =>
        {
            if(error){
                console.log(error);
            }else{
                return res.render('register', {
                    message: 'Congratulations, you have been registered.'
                });
            }
        })
    });
};