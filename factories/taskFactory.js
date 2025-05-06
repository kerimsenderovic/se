class Task {
    constructor(title, description, status) {
        this.title = title;
        this.description = description;
        this.status = status;  
    }
}

class UrgentTask extends Task {
    constructor(title, description) {
        super(title, description, 'urgent');
    }
}

class NormalTask extends Task {
    constructor(title, description) {
        super(title, description, 'normal');
    }
}

function TaskFactory(type, title, description) {
    switch (type) {
        case 'urgent':
            return new UrgentTask(title, description);
        case 'normal':
        default:
            return new NormalTask(title, description);
    }
}

module.exports = TaskFactory;