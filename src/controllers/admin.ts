import { Request, Response, NextFunction } from "express"
import * as adminService from "../services/adminService"
import { ApiError } from "../util/ApiError"

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = req.query
    const tasks = await adminService.getAllTasksService(filters)
    res.status(200).json({ success: true, data: tasks })
  } catch (error) {
    next(error)
  }
}

export const updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, active } = req.body
    if (typeof active !== "boolean") throw new ApiError(400, "Active must be boolean")
    const user = await adminService.updateUserStatusService(userId, active)
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}

export const markTaskCompleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.body
    const task = await adminService.markTaskCompleteAdminService(taskId)
    res.status(200).json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

export const deleteTaskAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.body
    const result = await adminService.deleteTaskAdminService(taskId)
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}
