const mysql = require('mysql2');
let instance = null;

class Database {
    constructor() {
        this.connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
});

        this.connection.connect((err) => {
            if (err) {
                console.error('Database connection failed:', err.stack);
                return;
            }
            console.log('Connected to MySQL database.');
        });
    }

    static getInstance() {
        if (!instance) {
            instance = new Database();
        }
        return instance;
    }

    getConnection() {
        return this.connection;
    }
}

module.exports = Database;