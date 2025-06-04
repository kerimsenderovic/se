const TaskModel = require('../models/taskModel');
const db = require('../models/db').getInstance().getConnection();

describe('TaskModel', () => {
  let insertedId;

  afterAll(() => {
    db.end();
  });

  test('should create a new task', done => {
    const newTask = {
      title: 'Test Task',
      description: 'This is a test',
      status: 'pending',
    };

    TaskModel.create(newTask, (err, result) => {
      expect(err).toBeNull();
      expect(result.affectedRows).toBe(1);
      insertedId = result.insertId;
      done();
    });
  });

  test('should get the created task by ID', done => {
    TaskModel.getById(insertedId, (err, rows) => {
      expect(err).toBeNull();
      expect(rows.length).toBe(1);
      expect(rows[0].title).toBe('Test Task');
      done();
    });
  });

  test('should delete the created task', done => {
    TaskModel.delete(insertedId, (err, result) => {
      expect(err).toBeNull();
      expect(result.affectedRows).toBe(1);
      done();
    });
  });
});
