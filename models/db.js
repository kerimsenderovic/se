// models/db.js
const mysql = require('mysql2/promise');

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async testConnection() {
    try {
      const connection = await this.pool.getConnection();
      await connection.ping();
      connection.release();
      console.log('Successfully connected to MySQL database');
      return true;
    } catch (err) {
      console.error('Database connection failed:', err);
      return false;
    }
  }

  getPool() {
    return this.pool;
  }
}

module.exports = new Database();
