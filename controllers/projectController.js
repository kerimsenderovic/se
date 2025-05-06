const ProjectModel = require('../models/projectModel');

exports.getAllProjects = (req, res) => {
    ProjectModel.getAll((err, projects) => {
        if (err) return res.status(500).json({ error: err });
        res.json(projects);
    });
};

exports.getProjectById = (req, res) => {
    ProjectModel.getById(req.params.id, (err, project) => {
        if (err) return res.status(500).json({ error: err });
        res.json(project[0]);
    });
};

exports.createProject = (req, res) => {
    const { name, description } = req.body;
    const project = { name, description };

    ProjectModel.create(project, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Project created', id: result.insertId });
    });
};

exports.updateProject = (req, res) => {
    const project = req.body;
    ProjectModel.update(req.params.id, project, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Project updated' });
    });
};

exports.deleteProject = (req, res) => {
    ProjectModel.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Project deleted' });
    });
};
