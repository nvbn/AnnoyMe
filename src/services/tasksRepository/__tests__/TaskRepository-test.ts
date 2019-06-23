import { drop, omit } from "lodash";
import TaskRepository from "../TaskRepository";

it("TaskRepository returns all stored tasks", async () => {
  const storedTasks = [
    {
      id: "test",
      created: new Date(),
      title: "Write the code",
      schedule: {},
    },
  ];
  const storage = {
    read: jest.fn(() => new Promise(resolve => resolve(storedTasks))),
  };

  const taskRepository = new TaskRepository(storage as any, {} as any);

  const tasks = await taskRepository.getAll();

  expect(tasks).toEqual(storedTasks);
  expect(storage.read.mock.calls).toEqual([[]]);
});

it("TaskRepository returns default value when storage doesn't have data", async () => {
  const storage = {
    read: jest.fn(() => new Promise(resolve => resolve(undefined))),
  };
  const defaultTasks = [
    {
      id: "test",
      created: new Date(),
      title: "Write the code",
      schedule: {},
    },
  ];

  const taskRepository = new TaskRepository(storage as any, defaultTasks);

  const tasks = await taskRepository.getAll();

  expect(tasks).toEqual(defaultTasks);
  expect(storage.read.mock.calls).toEqual([[]]);
});

it("TaskRepository saves updated tasks to a storage", async () => {
  const storedTasks = [
    {
      id: "test",
      created: new Date(),
      title: "Write the code",
      schedule: {},
    },
    {
      id: "other",
      created: new Date(),
      title: "Go to sleep",
      schedule: {},
    },
  ];
  const storage = {
    read: jest.fn(() => new Promise(resolve => resolve(storedTasks))),
    write: jest.fn(() => new Promise(resolve => resolve())),
  };
  const updatedTask = {
    id: "test",
    created: new Date(),
    title: "Stop writing the code",
    schedule: {},
  };

  const taskRepository = new TaskRepository(storage as any, {} as any);

  await taskRepository.save(updatedTask);

  expect(storage.read.mock.calls).toEqual([[]]);
  expect(storage.write.mock.calls).toEqual([
    [[updatedTask, ...drop(storedTasks)]],
  ]);
});

it("TaskRepository does nothing when trying to save not created task", async () => {
  const storedTasks = [
    {
      id: "other",
      created: new Date(),
      title: "Go to sleep",
      schedule: {},
    },
  ];
  const storage = {
    read: jest.fn(() => new Promise(resolve => resolve(storedTasks))),
    write: jest.fn(() => new Promise(resolve => resolve())),
  };
  const updatedTask = {
    id: "test",
    created: new Date(),
    title: "Stop writing the code",
    schedule: {},
  };

  const taskRepository = new TaskRepository(storage as any, {} as any);

  await taskRepository.save(updatedTask);

  expect(storage.read.mock.calls).toEqual([[]]);
  expect(storage.write.mock.calls).toEqual([]);
});

it("TaskRepository stores newly created task in a storage", async () => {
  const storedTasks = [
    {
      id: "other",
      created: new Date(),
      title: "Go to sleep",
      schedule: {},
    },
  ];
  const storage = {
    read: jest.fn(() => new Promise(resolve => resolve(storedTasks))),
    write: jest.fn(() => new Promise(resolve => resolve())),
  };
  const newTask = {
    id: "test",
    created: new Date(),
    title: "Stop writing the code",
    schedule: {},
  };

  const taskRepository = new TaskRepository(storage as any, {} as any);

  await taskRepository.create(newTask);

  expect(storage.read.mock.calls).toEqual([[]]);
  expect(storage.write.mock.calls).toEqual([[[newTask, ...storedTasks]]]);
});

it("TaskRepository returns a task by id", async () => {
  const taskId = "test";
  const storedTasks = [
    {
      id: taskId,
      created: new Date(),
      title: "Write the code",
      schedule: {},
    },
    {
      id: "other",
      created: new Date(),
      title: "Go to sleep",
      schedule: {},
    },
  ];
  const storage = {
    read: jest.fn(() => new Promise(resolve => resolve(storedTasks))),
  };

  const taskRepository = new TaskRepository(storage as any, {} as any);

  const task = await taskRepository.getOne(taskId);

  expect(task).toEqual(storedTasks[0]);
  expect(storage.read.mock.calls).toEqual([[]]);
});

it("TaskRepository returns an empty task when unable to find a task by id", async () => {
  const storedTasks = [
    {
      id: "other",
      created: new Date(),
      title: "Go to sleep",
      schedule: {},
    },
  ];
  const storage = {
    read: jest.fn(() => new Promise(resolve => resolve(storedTasks))),
  };
  const taskId = "test";

  const taskRepository = new TaskRepository(storage as any, {} as any);

  const task = await taskRepository.getOne(taskId);

  // created is the current date
  expect(omit(task, ["created"])).toEqual({
    ...omit(taskRepository.emptyTask(), ["created"]),
    id: taskId,
  });
  expect(storage.read.mock.calls).toEqual([[]]);
});

it("TaskRepository deletes stored task", async () => {
  const taskId = "test";
  const storedTasks = [
    {
      id: taskId,
      created: new Date(),
      title: "Write the code",
      schedule: {},
    },
    {
      id: "other",
      created: new Date(),
      title: "Go to sleep",
      schedule: {},
    },
  ];
  const storage = {
    read: jest.fn(() => new Promise(resolve => resolve(storedTasks))),
    write: jest.fn(() => new Promise(resolve => resolve())),
  };

  const taskRepository = new TaskRepository(storage as any, {} as any);

  await taskRepository.delete(taskId);

  expect(storage.read.mock.calls).toEqual([[]]);
  expect(storage.write.mock.calls).toEqual([[drop(storedTasks)]]);
});

it("TaskReposiotry creates an empty task", () => {
  const taskRepository = new TaskRepository({} as any, {} as any);

  const task = taskRepository.emptyTask();

  expect(task.id).toBeTruthy();
  expect(task.title).toBe("");
  expect(task.created).toBeTruthy();
  expect(task.schedule).toBeTruthy();
});
