// Import express so we can use its router feature
const express = require('express');

// Create a new router object. This is like a mini-app that only handles routing (URLs).
const router = express.Router();

// Import our controller. The controller holds all the actual logic (the functions)
// for what should happen when someone visits these routes.
const schoolController = require('../controllers/schoolController');

// Define our routes:
// 1. POST request to /addSchool. When this URL is hit, run the addSchool function.
// We use POST when we are sending NEW data to the server to be saved.
router.post('/addSchool', schoolController.addSchool);

// 2. GET request to /listSchools. When this URL is hit, run the listSchools function.
// We use GET when we just want to retrieve data from the server.
router.get('/listSchools', schoolController.listSchools);

// Export the router so it can be used in server.js
module.exports = router;
