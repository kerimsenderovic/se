
const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
  constructor() {
    this.pool = mysql.createPool({
  host: 'trolley.proxy.rlwy.net',  
  port: 33610,                     
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  ssl: { rejectUnauthorized: false }, 
  connectTimeout: 5000 
});
  }

  async testConnection(retries = 3, delay = 2000) {
    for (let i = 0; i < retries; i++) {
      try {
        const connection = await this.pool.getConnection();
        await connection.ping();
        connection.release();
        console.log('Successfully connected to MySQL database');
        return true;
      } catch (err) {
        console.error(`Database connection failed (attempt ${i + 1}/${retries}):`, err.message);
        if (i < retries - 1) {
          await new Promise(res => setTimeout(res, delay));
        }
      }
    }
    return false;
  }

  getPool() {
    return this.pool;
  }
}

module.exports = new Database();