const UserModel = require('../models/userModel');

exports.getAllUsers = (req, res) => {
    UserModel.getAll((err, users) => {
        if (err) return res.status(500).json({ error: err });
        res.json(users);
    });
};

exports.getUserById = (req, res) => {
    UserModel.getById(req.params.id, (err, user) => {
        if (err) return res.status(500).json({ error: err });
        res.json(user[0]);
    });
};

exports.createUser = (req, res) => {
    const { username, email, password, role } = req.body;
    const user = { username, email, password, role };

    UserModel.create(user, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'User created', id: result.insertId });
    });
};

exports.updateUser = (req, res) => {
    const user = req.body;
    UserModel.update(req.params.id, user, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'User updated' });
    });
};

exports.deleteUser = (req, res) => {
    UserModel.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'User deleted' });
    });
};
