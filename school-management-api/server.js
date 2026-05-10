// 1. IMPORTING REQUIRED PACKAGES
// ==========================================
// dotenv: This package loads the variables we keep in our .env file.
// It's a secure way to keep passwords and database links secret.
require('dotenv').config();

// express: The framework we use to build our web server. It makes creating APIs very easy.
const express = require('express');

// cors: Cross-Origin Resource Sharing. This allows a website frontend (like React or HTML)
// to talk to our backend API without browser security blocking it.
const cors = require('cors');

// body-parser: This helps our server read and understand data that users send 
// to our API in the 'body' of their request (usually in JSON format).
const bodyParser = require('body-parser');

// 2. IMPORTING OUR OWN CODE
// ==========================================
// We import the routes which tell the server what to do when a user visits a specific URL.
const schoolRoutes = require('./routes/schoolRoutes');

// We import our database connection so the server can talk to MySQL.
const db = require('./config/db');

// 3. SETTING UP THE SERVER
// ==========================================
// Create an instance of an Express application
const app = express();

// Choose a port for our server to listen on. It will try to use the one in .env, 
// or it will default to 3000 if not found.
const PORT = process.env.PORT || 3000;

// 4. ADDING MIDDLEWARE
// ==========================================
// Middleware are functions that run before our routes. 
app.use(cors()); // Allow external requests
app.use(bodyParser.json()); // Tell the server to expect JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Tell the server to expect URL-encoded data

// 5. TESTING THE DATABASE CONNECTION
// ==========================================
// When the server starts, we try to grab a connection from the database to ensure it's working.
db.getConnection()
    .then(connection => {
        console.log('Successfully connected to the MySQL database.');
        connection.release(); // Important: always release the connection back to the pool!
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err.message);
    });

// 6. SETTING UP ROUTES
// ==========================================
// Tell the app to use our schoolRoutes file for all routes.
// So, if a user goes to /addSchool, it will look inside schoolRoutes to find it.
app.use('/', schoolRoutes);

// A simple base route (Health Check) just to see if the server is alive
app.get('/', (req, res) => {
    // res.json sends a JSON response back to the browser or Postman
    res.json({ message: 'School Management API is running.' });
});

// 7. STARTING THE SERVER
// ==========================================
// Finally, we tell the app to listen on the port we chose.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
