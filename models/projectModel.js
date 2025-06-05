const db = require('./db').getPool();

class ProjectModel {
    static getAll(callback) {
        const sql = 'SELECT * FROM projects';
        db.query(sql, callback);
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM projects WHERE id = ?';
        db.query(sql, [id], callback);
    }

    static create(project, callback) {
        const sql = 'INSERT INTO projects (name, description) VALUES (?, ?)';
        db.query(sql, [project.name, project.description], callback);
    }

    static update(id, project, callback) {
        const sql = 'UPDATE projects SET name = ?, description = ? WHERE id = ?';
        const params = [project.name, project.description, id];
        db.query(sql, params, callback);
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM projects WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = ProjectModel;
