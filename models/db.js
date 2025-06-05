// models/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.MYSQLHOST || 'trolley.proxy.rlwy.net',
      user: process.env.MYSQLUSER || 'root',
      password: process.env.MYSQLPASSWORD || 'lzxkPnxcOhYcozXiIAnbOpVOzNWOThYn',
      database: process.env.MYSQLDATABASE || 'railway',
      port: process.env.MYSQLPORT || 33610,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 10000, // 10 seconds timeout
      ssl: {
        rejectUnauthorized: false // Railway's public URL might need SSL
      }
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