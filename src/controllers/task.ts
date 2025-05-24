import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
  startTaskTimerService,
  stopTaskTimerService,
  reportTimeSpentService,
  markTaskCompleteService,
} from "../services/taskService";

import { Request, Response, NextFunction } from "express";
import { customRequest } from "../types/customDefinition";
import { ApiError } from "../util/ApiError";

// Create a task
export const createTask = async (req: customRequest, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user;
    const task = await createTaskService(userId, req.body);
    return res.status(201).json({ data: task, msg: "Task created", error: false });
  } catch (err) {
    next(err);
  }
};

// Get tasks (supports pagination/filtering)
export const getTasks = async (req: customRequest, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user;
    const tasks = await getTasksService(userId, req.query);
    return res.status(200).json({ data: tasks, msg: "Tasks fetched", error: false });
  } catch (err) {
    next(err);
  }
};

// Get task by ID
export const getTaskById = async (req: customRequest, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user;
    const taskId = req.params.id;
    const task = await getTaskByIdService(userId, taskId);
    if (!task) throw new ApiError(404, "Task not found");
    return res.status(200).json({ data: task, msg: "Task found", error: false });
  } catch (err) {
    next(err);
  }
};

// Update a task
export const updateTask = async (req: customRequest, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user;
    const taskId = req.params.id;
    const updated = await updateTaskService(userId, taskId, req.body);
    return res.status(200).json({ data: updated, msg: "Task updated", error: false });
  } catch (err) {
    next(err);
  }
};

// Delete a task
export const deleteTask = async (req: customRequest, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user;
    const taskId = req.params.id;
    await deleteTaskService(userId, taskId);
    return res.status(200).json({ msg: "Task deleted", error: false });
  } catch (err) {
    next(err);
  }
};

// Start task timer
export const startTaskTimer = async (req: customRequest, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user;
    const taskId = req.params.id;
    const task = await startTaskTimerService(userId, taskId);
    return res.status(200).json({ data: task, msg: "Timer started", error: false });
  } catch (err) {
    next(err);
  }
};

// Stop task timer
export const stopTaskTimer = async (req: customRequest, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user;
    const taskId = req.params.id;
    const task = await stopTaskTimerService(userId, taskId);
    return res.status(200).json({ data: task, msg: "Timer stopped", error: false });
  } catch (err) {
    next(err);
  }
};

// Report time spent across tasks
export const reportTimeSpent = async (req: customRequest, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user;
    const report = await reportTimeSpentService(userId);
    return res.status(200).json({ data: report, msg: "Time report generated", error: false });
  } catch (err) {
    next(err);
  }
};


export const markTaskCompleteController = async (req: customRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id
    const taskId  = req.params.id

    if (!taskId) {
      throw new ApiError(400, "Task ID is required")
    }

    const updatedTask = await markTaskCompleteService(userId, taskId)

    res.status(200).json({
      data: updatedTask,
      message: "Task marked as completed successfully",
      error: false,
    })
  } catch (error) {
    next(error)
  }
}

