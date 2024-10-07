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

// Login function
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    // if (!email || !password) {
    //     return res.status(400).render('login', {
    //         message: 'Please provide an email and password'
    //     });
    // }

    // Query the database to find the user by email
    db.query('SELECT * FROM users WHERE email_id = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        // Check if user exists
        if (results.length === 0) {
            return res.render('login', {
                message: 'Email or password is incorrect'
            });
        }

        // Compare provided password with hashed password from the database
        const isMatch = await bcrypt.compare(password, results[0].password);

        if (!isMatch) {
            return res.render('login', {
                message: 'Email or password is incorrect'
            });
        }

        // If login is successful, redirect to YouTube
        return res.redirect('https://www.youtube.com');
    });
};
