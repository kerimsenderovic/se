const db = require('./db').getInstance().getConnection();

class UserModel {
    static getAll(callback) {
        const sql = 'SELECT * FROM users';
        db.query(sql, callback);
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        db.query(sql, [id], callback);
    }

    static create(user, callback) {
        const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [user.username, user.email, user.password, user.role], callback);
    }

    static update(id, user, callback) {
        const sql = 'UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?';
        const params = [user.username, user.email, user.password, user.role, id];
        db.query(sql, params, callback);
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM users WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = UserModel;
