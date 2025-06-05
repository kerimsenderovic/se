const mysql = require('mysql2');
let instance = null;

class Database {
    constructor() {
        this.connectWithRetry();
    }

    connectWithRetry(retries = 10, delay = 3000) {
        const connect = () => {
            this.connection = mysql.createConnection({
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_NAME || 'task_management'
            });

            this.connection.connect((err) => {
                if (err) {
                    console.error(`Database connection failed. Retries left: ${retries - 1}`);
                    if (retries <= 1) {
                        console.error('Could not connect to the database. Exiting...');
                        process.exit(1);
                    }
                    setTimeout(() => this.connectWithRetry(retries - 1, delay), delay);
                } else {
                    console.log('✅ Connected to MySQL database.');
                }
            });
        };

        connect();
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
