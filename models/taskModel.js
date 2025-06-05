// models/taskModel.js
const db = require('./db').getPool();

class TaskModel {
  static async getAll() {
    const sql = 'SELECT * FROM tasks';
    const [rows] = await db.query(sql);
    return rows;
  }

  static async getById(id) {
    const sql = 'SELECT * FROM tasks WHERE id = ?';
    const [rows] = await db.query(sql, [id]);
    return rows[0]; 
  }

  static async create(task) {
    const sql = 'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)';
    const [result] = await db.query(sql, [task.title, task.description, task.status]);
    return result.insertId; 
  }

  static async update(id, task) {
    const sql = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
    const [result] = await db.query(sql, [task.title, task.description, task.status, id]);
    return result.affectedRows; 
  }

  static async delete(id) {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    const [result] = await db.query(sql, [id]);
    return result.affectedRows; 
  }
}

module.exports = TaskModel;
