const TaskModel = require('../models/taskModel');

describe('TaskModel', () => {
  let insertedTaskIds = [];

  afterAll(async () => {
   
    await Promise.all(insertedTaskIds.map(id => TaskModel.delete(id)));
  });

  it('should create and retrieve a task', async () => {
    const newTask = {
      title: 'Test Task',
      description: 'Test description',
      status: 'pending'
    };

    const taskId = await TaskModel.create(newTask);
    insertedTaskIds.push(taskId);
    expect(taskId).toBeGreaterThan(0);

    const task = await TaskModel.getById(taskId);
    expect(task.title).toBe(newTask.title);
    expect(task.status).toBe(newTask.status);
  });

 
  it('should retrieve all tasks', async () => {
    const tasks = await TaskModel.getAll();
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBeGreaterThanOrEqual(1); 
  });

  
  it('should update a task', async () => {
    const newTask = {
      title: 'Update Test Task',
      description: 'Update test description',
      status: 'pending'
    };

    const taskId = await TaskModel.create(newTask);
    insertedTaskIds.push(taskId);

    const updatedData = {
      title: 'Updated Task Title',
      description: 'Updated description',
      status: 'completed'
    };

    const affectedRows = await TaskModel.update(taskId, updatedData);
    expect(affectedRows).toBe(1);

    const updatedTask = await TaskModel.getById(taskId);
    expect(updatedTask.title).toBe(updatedData.title);
    expect(updatedTask.status).toBe(updatedData.status);
  });

 
  it('should delete a task', async () => {
    const newTask = {
      title: 'Delete Test Task',
      description: 'Delete test description',
      status: 'pending'
    };

    const taskId = await TaskModel.create(newTask);
    
    const deleteResult = await TaskModel.delete(taskId);
    expect(deleteResult).toBe(1);

    const deletedTask = await TaskModel.getById(taskId);
    expect(deletedTask).toBeUndefined();
  });

 
  it('should return undefined for non-existent task', async () => {
    const nonExistentTask = await TaskModel.getById(999999);
    expect(nonExistentTask).toBeUndefined();
  });

 
  it('should create task with only required fields', async () => {
    const minimalTask = {
      title: 'Minimal Task',
      status: 'pending' 
    };

    const taskId = await TaskModel.create(minimalTask);
    insertedTaskIds.push(taskId);
    expect(taskId).toBeGreaterThan(0);

    const task = await TaskModel.getById(taskId);
    expect(task.title).toBe(minimalTask.title);
    expect(task.status).toBe(minimalTask.status);
    expect(task.description).toBeNull(); 
  });
});