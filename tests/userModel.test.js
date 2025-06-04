const UserModel = require('../models/userModel');
const db = require('../models/db').getInstance().getConnection();

describe('UserModel', () => {
  let userId;
  const randomUsername = 'testuser_' + Date.now(); 
  const email = `test_${Date.now()}@example.com`;

  afterAll(() => {
    db.end(); 
  });

  test('should create a user', done => {
    const user = {
      username: randomUsername,
      email: email,
      password: 'pass123',
      role: 'admin',
    };

    UserModel.create(user, (err, result) => {
      expect(err).toBeNull(); 
      expect(result.affectedRows).toBe(1);
      userId = result.insertId;
      done();
    });
  });

  test('should retrieve the user by ID', done => {
    UserModel.getById(userId, (err, rows) => {
      expect(err).toBeNull();
      expect(rows.length).toBe(1);
      expect(rows[0].username).toBe(randomUsername);
      done();
    });
  });

  test('should delete the user', done => {
    UserModel.delete(userId, (err, result) => {
      expect(err).toBeNull();
      expect(result.affectedRows).toBe(1);
      done();
    });
  });
});
