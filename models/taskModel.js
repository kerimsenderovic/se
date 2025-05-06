const db = require('./db').getInstance().getConnection();

class TaskModel {
    static getAll(callback) {
        const sql = 'SELECT * FROM tasks';
        db.query(sql, callback);
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM tasks WHERE id = ?';
        db.query(sql, [id], callback);
    }

    static create(task, callback) {
        const sql = 'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)';
        db.query(sql, [task.title, task.description, task.status], callback);  
    }

    static update(id, task, callback) {
        const sql = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
        const params = [task.title, task.description, task.status, id];
        
        
    
        db.query(sql, params, callback);
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM tasks WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = TaskModel;
