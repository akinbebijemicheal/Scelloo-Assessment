import Task from "../models/Task"; // Sequelize model
import { ApiError } from "../util/ApiError";

// Create a new task
export const createTaskService = async (userId: string, data: any) => {
  return await Task.create({ ...data, userId });
};

// Get all tasks with filtering and pagination
export const getTasksService = async (userId: string, query: any) => {
  const { status, page = 1, limit = 10 } = query;

  const whereClause: any = { userId };
  if (status) whereClause.status = status;

  const offset = (Number(page) - 1) * Number(limit);
  const tasks = await Task.findAndCountAll({
    where: whereClause,
    limit: Number(limit),
    offset: Number(offset),
    order: [["createdAt", "DESC"]],
  });

  return {
    data: tasks.rows,
    count: tasks.count,
    totalPages: Math.ceil(tasks.count / limit),
    currentPage: Number(page),
  };
};

// Get a single task by ID
export const getTaskByIdService = async (userId: string, taskId: string) => {
  return await Task.findOne({ where: { id: taskId, userId } });
};

// Update a task
export const updateTaskService = async (userId: string, taskId: string, data: any) => {
  const task = await getTaskByIdService(userId, taskId);
  if (!task) throw new ApiError(404, "Task not found");
  await task.update(data);
  return task;
};

// Delete a task
export const deleteTaskService = async (userId: string, taskId: string) => {
  const task = await getTaskByIdService(userId, taskId);
  if (!task) throw new ApiError(404, "Task not found");
  await task.destroy();
};

// Start the task timer
export const startTaskTimerService = async (userId: string, taskId: string) => {
  const task = await getTaskByIdService(userId, taskId);
  if (!task) throw new ApiError(404, "Task not found");
  if (task.timerStartedAt) throw new ApiError(400, "Timer already running");

  await task.update({ timerStartedAt: new Date() });
  return task;
};

// Stop the task timer and calculate time spent
export const stopTaskTimerService = async (userId: string, taskId: string) => {
  const task = await getTaskByIdService(userId, taskId);
  if (!task) throw new ApiError(404, "Task not found");
  if (!task.timerStartedAt) throw new ApiError(400, "Timer was not started");

  const now = new Date();
  const started = new Date(task.timerStartedAt);
  const diff = Math.floor((now.getTime() - started.getTime()) / 1000); // in seconds

  const total = task.totalTimeSpent || 0;
  await task.update({
    totalTimeSpent: total + diff,
    timerStartedAt: null,
  });

  return task;
};

export const markTaskCompleteService = async (userId: string, taskId: string) => {
  const task = await Task.findOne({ where: { id: taskId, userId } })
  if (!task) throw new ApiError(404, "Task not found")

  // If timer running, calculate elapsed time and add to totalTimeSpent
  if (task.timerStartedAt) {
    const now = new Date()
    const started = new Date(task.timerStartedAt)
    const diff = Math.floor((now.getTime() - started.getTime()) / 1000) // seconds

    task.totalTimeSpent = (task.totalTimeSpent || 0) + diff
    task.timerStartedAt = null
  }

  task.status = "completed"

  await task.save()

  return task
}




// Report total time spent on all tasks
export const reportTimeSpentService = async (userId: string) => {
  const tasks = await Task.findAll({ where: { userId } });
  const totalSeconds = tasks.reduce((acc, task) => acc + (task.totalTimeSpent || 0), 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    totalSeconds,
    formatted: `${hours}h ${minutes}m ${seconds}s`,
    tasksCounted: tasks.length,
  };
};

