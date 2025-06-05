const mysql = require('mysql2');
let instance = null;

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.MYSQLHOST,
            user: process.env.MYSQLUSER,
            password: process.env.MYSQLPASSWORD,
            database: process.env.MYSQLDATABASE,
            port: process.env.MYSQLPORT || 3306,
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
