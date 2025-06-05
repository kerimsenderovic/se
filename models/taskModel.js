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
    return rows[0]; // return single task or undefined
  }

  static async create(task) {
    const sql = 'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)';
    const [result] = await db.query(sql, [task.title, task.description, task.status]);
    return result.insertId; // return new inserted task id
  }

  static async update(id, task) {
    const sql = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
    const [result] = await db.query(sql, [task.title, task.description, task.status, id]);
    return result.affectedRows; // number of rows updated (should be 1 or 0)
  }

  static async delete(id) {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    const [result] = await db.query(sql, [id]);
    return result.affectedRows; // number of rows deleted
  }
}

module.exports = TaskModel;
