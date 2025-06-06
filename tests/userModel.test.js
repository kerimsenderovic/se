const UserModel = require('../models/userModel');

jest.setTimeout(30000);

describe('UserModel', () => {
  let insertedUserIds = [];

  afterAll(async () => {
    
    await Promise.all(insertedUserIds.map(id => UserModel.delete(id)));
  });

  it('should create and retrieve a user', async () => {
    const uniqueUsername = `testuser_${Date.now()}`;
    const newUser = {
      username: uniqueUsername,
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    };

    const userId = await UserModel.create(newUser);
    insertedUserIds.push(userId);
    expect(userId).toBeGreaterThan(0);

    const retrievedUser = await UserModel.getById(userId);
    expect(retrievedUser.username).toBe(newUser.username);
    expect(retrievedUser.email).toBe(newUser.email);
  });

  
  it('should retrieve all users', async () => {
    const users = await UserModel.getAll();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThanOrEqual(1); 
  });

  
  it('should update a user', async () => {
    const uniqueUsername = `updateuser_${Date.now()}`;
    const newUser = {
      username: uniqueUsername,
      email: 'update@example.com',
      password: 'updatepass',
      role: 'admin'
    };

    const userId = await UserModel.create(newUser);
    insertedUserIds.push(userId);

    const updatedData = {
      username: `updated_${uniqueUsername}`,
      email: 'updated@example.com',
      password: 'newpassword',
      role: 'user'
    };

    const affectedRows = await UserModel.update(userId, updatedData);
    expect(affectedRows).toBe(1);

    const updatedUser = await UserModel.getById(userId);
    expect(updatedUser.username).toBe(updatedData.username);
    expect(updatedUser.email).toBe(updatedData.email);
  });

  
  it('should delete a user', async () => {
    const uniqueUsername = `deleteuser_${Date.now()}`;
    const newUser = {
      username: uniqueUsername,
      email: 'delete@example.com',
      password: 'deletepass',
      role: 'user'
    };

    const userId = await UserModel.create(newUser);
    
    const deleteResult = await UserModel.delete(userId);
    expect(deleteResult).toBe(1);

    const deletedUser = await UserModel.getById(userId);
    expect(deletedUser).toBeUndefined();
  });

  
  it('should return undefined for non-existent user', async () => {
    const nonExistentUser = await UserModel.getById(999999);
    expect(nonExistentUser).toBeUndefined();
  });
});