# School Management API

This is a Node.js and Express API for managing schools and listing them by proximity based on user coordinates. It connects to a MySQL database to store school data and uses the Haversine formula to compute distances on the fly.

## Project Structure

```
school-management-api/
├── config/
│   └── db.js                 # MySQL database connection pool configuration
├── controllers/
│   └── schoolController.js   # Logic for API endpoints
├── routes/
│   └── schoolRoutes.js       # Express router setup
├── utils/
│   └── distance.js           # Haversine distance utility function
├── .env                      # Environment variables
├── package.json
├── server.js                 # Application entry point
├── init_db.js                # Helper script to create DB schema
├── schema.sql                # SQL schema file
└── postman_collection.json   # Exported Postman collection for testing
```

## Prerequisites
- Node.js installed
- MySQL database (credentials provided in `.env`)

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Initialize Database:**
   Ensure your `.env` contains the correct `DB_URL`. Then run the init script to create the `schools` table:
   ```bash
   node init_db.js
   ```

3. **Start the Server:**
   ```bash
   node server.js
   ```
   The server should start on port `3000` (or the port defined in `.env`).

## API Endpoints

### 1. Add School
**POST** `/addSchool`

Adds a new school to the database.

**Request Body:**
```json
{
  "name": "ABC School",
  "address": "Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

### 2. List Schools
**GET** `/listSchools?latitude=28.6139&longitude=77.2090`

Lists all schools sorted by proximity to the provided user latitude and longitude.

## Postman Collection
You can import `postman_collection.json` into Postman to test the endpoints easily.

## Deployment Notes
- **Render/Railway/Cyclic:** The project is configured with a basic structure and requires standard start scripts (like `node server.js`). 
- Make sure to add `DB_URL` to your hosting provider's Environment Variables panel.
