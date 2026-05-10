require('dotenv').config();
const mysql = require('mysql2/promise');

async function initializeDatabase() {
    try {
        console.log('Connecting to database...');
        const connection = await mysql.createConnection(process.env.DB_URL);
        
        console.log('Creating schools table if it does not exist...');
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS schools (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                latitude FLOAT NOT NULL,
                longitude FLOAT NOT NULL
            );
        `;
        
        await connection.query(createTableQuery);
        console.log('Table "schools" is ready.');
        
        await connection.end();
        console.log('Database initialization completed.');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

initializeDatabase();
